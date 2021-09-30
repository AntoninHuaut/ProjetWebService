import { Context } from "../deps.ts";
import { GlobalConfig } from "../model/ConfigModel.ts";
import ResponseError from "../model/ResponseError.ts";
import PermissionVoter from "../Voter/PermissionVoter.ts";

export default class Proxy {

    private readonly config: GlobalConfig

    constructor(config: GlobalConfig) {
        this.config = config;
    }

    async handle(ctx: Context<any>) {
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
        }

        const userToken = ctx.request.url.searchParams.get('token') ?? '';
        const hasPermission = await this.checkPermission(webService, urlPath, userToken, ctx);

        if (!hasPermission) {
            throw new ResponseError(403, url.pathname, "Invalid token or resource access denied");
        }

        if (ctx.request.hasBody) {
            try {
                const bodyRaw = ctx.request.body({ type: 'text' });
                options.body = await bodyRaw.value;
            } catch (_ignore) {
                throw new ResponseError(400, url.pathname, "Invalid body");
            }
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

    checkPermission(webService: string, urlPath: string, token: string, ctx: Context<any>): Promise<Boolean> {
        return new PermissionVoter(webService, urlPath, token, this.config, ctx).vote();
    }

    sendResponse(ctx: Context<any>, status: number, body: any, headers: Headers | undefined = undefined) {
        ctx.response.status = status;
        ctx.response.body = body;
        headers?.forEach((value: string, key: string) => ctx.response.headers.set(key, value));
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