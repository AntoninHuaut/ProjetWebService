import { Application, Context, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { GlobalConfig } from "./ConfigModel.ts";
import ResponseError from "./ResponseError.ts";

export default class Server {

    private static readonly CORS_ORIGIN = 'Access-Control-Allow-Origin';
    private static readonly CORS_METHODS = 'Access-Control-Allow-Methods';
    private static readonly CORS_HEADERS = 'Access-Control-Allow-Headers';

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

        router.options('/(.*)', (ctx: Context<any>) => {
            ctx.response.status = 200;
            ctx.response.body = null;
        });

        router.all('/(.*)', async (ctx: Context<any>) => {
            try {
                await this.proxy(ctx);
            } catch (ex) {
                let dataError;
                if (!(ex instanceof ResponseError)) {
                    dataError = new ResponseError(500, ctx.request.url.pathname, ex.toString());
                } else {
                    dataError = ex;
                }

                ctx.response.status = dataError.status;
                ctx.response.body = {
                    timestamp: new Date().toISOString(),
                    status: dataError.status,
                    error: dataError.message,
                    path: dataError.path
                };
            }
        });

        app.use((ctx: Context<any>, next: () => any) => {
            ctx.response.headers.set(Server.CORS_ORIGIN, "*");
            ctx.response.headers.set(Server.CORS_METHODS, "*");
            ctx.response.headers.set(Server.CORS_HEADERS, "Content-Type");
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
            throw new ResponseError(400, url.pathname, "Invalid WebService");
        }

        const urlPath: string = url.pathname.replace(`/${webService}`, '');
        const options: RequestInit = {
            method: ctx.request.method,
            headers: ctx.request.headers
        };

        if (ctx.request.hasBody) {
            const bodyRaw = ctx.request.body({ type: 'text' });

            try {
                const bodyValue = JSON.parse(await bodyRaw.value);
                const validBody: boolean = Array.isArray(bodyValue) || Object.keys(bodyValue).length > 0;

                if (validBody) {
                    options.body = JSON.stringify(bodyValue);
                }
            } catch (_ignore) {
                throw new ResponseError(400, url.pathname, "Invalid body: not a valid json");
            }
        }

        if (this.shouldHaveBody(ctx.request.method) && !options.body) {
            throw new ResponseError(400, urlPath, 'Invalid body: missing keys');
        }

        try {
            const proxyFetch: Promise<Response> = fetch(`${host}${urlPath}`, options);
            const response: Response = await this.timeoutPromise(new ResponseError(408, urlPath, "Timeout"), proxyFetch)
            this.sendResponse(ctx, response.status, response.body, response.headers);
        } catch (ex) {
            if (ex instanceof ResponseError) throw ex;

            throw new ResponseError(500, urlPath, ex.toString());
        }
    }

    sendResponse(ctx: Context<any>, status: number, body: any, headers: Headers | undefined = undefined) {
        ctx.response.status = status;
        ctx.response.body = body;

        if (headers) {
            headers.forEach((value: string, key: string) => {
                if ([Server.CORS_ORIGIN, Server.CORS_METHODS].includes(key)) return;

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