import { Application, Context } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { ConfigModule } from "./Config.ts";
import Config = ConfigModule.Config;

export default class Server {

    private readonly config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    async start() {
        const app = new Application();

        app.addEventListener('listen', () => {
            console.log(`Listening on localhost:${this.config.port}`);
        });

        app.use((ctx, next) => {
            ctx.response.headers.set('Access-Control-Allow-Origin', '*');
            return next();
        });

        app.use((ctx) => this.proxy(ctx));

        await app.listen({ port: this.config.port });
    }

    async proxy(ctx: Context<any>) {
        const url: URL = ctx.request.url;

        const webService: string = url.pathname.split('/').filter(el => el).shift() ?? '';
        const host: string = this.getWebService(webService);
        if (!host) {
            ctx.response.body = {
                error: "Invalid webservice"
            };
            ctx.response.status = 400;
            return;
        }

        const urlPath: string = url.pathname.replace(`/${webService}`, '');

        const options: RequestInit = {
            method: ctx.request.method,
            headers: ctx.request.headers
        };

        const bodyRaw = ctx.request.body();
        if (bodyRaw.type === 'json' && bodyRaw.value) {
            const bodyValue = await bodyRaw.value;
            const validBody: boolean = Array.isArray(bodyValue) || Object.keys(bodyValue).length > 0;

            if (validBody) {
                options.body = JSON.stringify(bodyValue);
            }
        }

        if (this.shouldHaveBody(ctx.request.method) && !options.body) {
            this.sendErrorResponse(ctx, 400, urlPath, 'Invalid body');
            return;
        }

        try {
            const proxyFetch: Promise<Response> = fetch(`${host}${urlPath}`, options);
            const response: Response = await this.timeoutPromise(7000, new Error("Timeout"), proxyFetch)
            this.sendResponse(ctx, response.status, response.body, response.headers);
        } catch (ex) {
            this.sendErrorResponse(ctx, 400, urlPath, ex.toString());
        }
    }

    sendErrorResponse(ctx: Context<any>, status: number, path: string, errorMsg: string) {
        this.sendResponse(ctx, status, {
            timestamp: new Date().toISOString(),
            status: status,
            error: errorMsg,
            path: path
        });
    }

    sendResponse(ctx: Context<any>, status: number, body: any, headers: Headers | undefined = undefined) {
        ctx.response.status = status;
        ctx.response.body = body;

        if (headers) {
            ctx.response.headers = headers;
        }
    }

    shouldHaveBody(httpMethod: string): boolean {
        return !['GET', 'HEAD'].includes(httpMethod?.toUpperCase());
    }

    timeoutPromise(timeout: number, err: Error, promise: Promise<Response>): Promise<Response> {
        return new Promise(function (resolve, reject) {
            promise.then(resolve, reject);
            setTimeout(reject.bind(null, err), timeout);
        });
    }

    getWebService(webService: string): string {
        return this.config.service[webService] ?? '';
    }
}