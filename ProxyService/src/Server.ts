import { Application, Context, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { GlobalConfig } from "./ConfigModel.ts";

export default class Server {

    private readonly config: GlobalConfig;

    constructor(config: GlobalConfig) {
        this.config = config;
    }

    async start() {
        const app = new Application();

        app.addEventListener('listen', () => {
            console.log(`Listening on localhost:${this.config.port}`);
        });

        const router = new Router();
        router.all('/(.*)', (ctx: any) => this.proxy(ctx));

        app.use((ctx: Context<any>, next: () => any) => {
            ctx.response.headers.set("Access-Control-Allow-Origin", "*");
            return next();
        });
        app.use(router.routes());

        await app.listen({ port: this.config.port });
    }

    async proxy(ctx: Context<any>) {
        const url: URL = ctx.request.url;

        const webService: string = url.pathname.split('/').filter(el => el).shift() ?? '';
        const host: string = this.getWebService(webService);
        if (!host) {
            this.sendErrorResponse(ctx, 400, url.pathname, 'Invalid webservice');
            return;
        }

        const urlPath: string = url.pathname.replace(`/${webService}`, '');
        const options: RequestInit = {
            method: ctx.request.method,
            headers: ctx.request.headers
        };

        const bodyRaw = ctx.request.body();
        if (bodyRaw.type === 'json' && bodyRaw.value) {
            try {
                const bodyValue = await bodyRaw.value; // Implicit JSON.parse()
                const validBody: boolean = Array.isArray(bodyValue) || Object.keys(bodyValue).length > 0;

                if (validBody) {
                    options.body = JSON.stringify(bodyValue);
                }
            } catch (ex) {
                this.sendErrorResponse(ctx, 400, urlPath, ex.toString());
                return;
            }
        }

        if (this.shouldHaveBody(ctx.request.method) && !options.body) {
            this.sendErrorResponse(ctx, 400, urlPath, 'Invalid body');
            return;
        }

        try {
            const proxyFetch: Promise<Response> = fetch(`${host}${urlPath}`, options);
            const response: Response = await this.timeoutPromise(new Error("Timeout"), proxyFetch)
            this.sendResponse(ctx, response.status, response.body, response.headers);
        } catch (ex) {
            this.sendErrorResponse(ctx, 408, urlPath, ex.toString());
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
            headers.forEach((value: string, key: string) => {
                if (key == 'Access-Control-Allow-Origin') return;

                ctx.response.headers.set(key, value);
            });
        }
    }

    shouldHaveBody(httpMethod: string): boolean {
        return ['POST', 'PUT'].includes(httpMethod?.toUpperCase());
    }

    timeoutPromise(err: Error, promise: Promise<Response>): Promise<Response> {
        return new Promise((resolve, reject) => {
            promise.then(resolve, reject);
            setTimeout(reject.bind(null, err), this.config.timeoutDelay);
        });
    }

    getWebService(webService: string): string {
        return this.config.service[webService] ?? '';
    }
}