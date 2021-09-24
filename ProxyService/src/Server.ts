import {Application} from "https://deno.land/x/oak@v9.0.1/mod.ts";
import {ConfigModule} from "./Config.ts";
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

        app.use((ctx) => this.proxy(ctx));

        await app.listen({port: this.config.port});
    }

    async proxy(ctx: any) {
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

        const options = {
            method: ctx.request.method,
            headers: ctx.request.headers,
            body: ctx.request.body
        };

        if (['GET', 'HEAD'].includes(options.method)) {
            delete options.body;
        }

        const response = await fetch(`${host}${urlPath}`, options);
        ctx.response.status = response.status;
        ctx.response.headers = response.headers;
        ctx.response.body = response.body;
    }

    getWebService(webService: string): string {
        return this.config.service[webService] ?? '';
    }
}