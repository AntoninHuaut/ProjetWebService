import { Application, Context, Router } from "./deps.ts";
import { GlobalConfig } from "./model/ConfigModel.ts";
import ResponseError from "./model/ResponseError.ts";
import Proxy from "./route/Proxy.ts";

export default class Server {

    private static readonly CORS_ORIGIN = 'Access-Control-Allow-Origin';
    private static readonly CORS_METHODS = 'Access-Control-Allow-Methods';
    private static readonly CORS_HEADERS = 'Access-Control-Allow-Headers';

    private readonly config: GlobalConfig;
    private readonly proxy: Proxy;

    constructor(config: GlobalConfig) {
        this.config = config;
        this.proxy = new Proxy(config);
    }

    async start() {
        const app = new Application();
        const router: Router = this.createRouter();

        app.addEventListener('listen', () => {
            console.log(`Listening on localhost:${this.config.port}`);
        });

        app.use((ctx: Context<any>, next: () => any) => {
            ctx.response.headers.set(Server.CORS_ORIGIN, "*");
            ctx.response.headers.set(Server.CORS_METHODS, "*");
            ctx.response.headers.set(Server.CORS_HEADERS, "*");
            return next();
        });

        app.use(router.routes());

        await app.listen({ port: this.config.port });
    }

    private createRouter(): Router {
        const router = new Router();

        router.options('/(.*)', (ctx: Context<any>) => {
            ctx.response.status = 200;
            ctx.response.body = null;
        });

        router.all('/(.*)', async (ctx: Context<any>) => {
            try {
                await this.proxy.handle(ctx);
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
                }
            }
        });

        return router;
    }
}