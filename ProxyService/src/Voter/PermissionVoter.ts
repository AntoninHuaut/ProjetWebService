import { Context } from "../deps.ts";
import { GlobalConfig } from "../model/ConfigModel.ts";

export default class PermissionVoter {

    private readonly webService: string;
    private readonly urlPath: string;
    private readonly token: string;
    private readonly ctx: Context<any>;

    private readonly config: GlobalConfig;

    constructor(webService: string, urlPath: string, token: string, config: GlobalConfig, ctx: Context<any>) {
        this.webService = webService;
        this.urlPath = urlPath;
        this.token = token;
        this.config = config;
        this.ctx = ctx;
    }

    private async getAction(): Promise<Action> {
        const method = this.ctx.request.method;

        let action: Action | null = null;

        switch (this.webService) {
            case 'library':
                if (method === 'GET') {
                    action = Action.CONSULT;
                }
                else if (this.urlPath.startsWith("/borrow")) {
                    action = Action.MANAGE_BORROW;
                }
                else if (this.urlPath.startsWith("/book")
                    || this.urlPath.startsWith("/publisher")
                    || this.urlPath.startsWith("/author")) {
                    action = Action.MANAGE_BOOK_PUBLISHER_AUTHOR;
                }

                break;

            case 'user':
                if (this.urlPath.startsWith("/access")) return Action.NOTHING;

                if (this.urlPath.startsWith("/user")) {
                    if ((method === 'POST' || method === 'PUT') && this.ctx.request.hasBody) {
                        let bodyJson: any;
                        try {
                            const bodyRaw = this.ctx.request.body({ type: 'text' });
                            bodyJson = JSON.parse(await bodyRaw.value);
                        } catch (_ignore) {
                            // ignore
                        }

                        if (bodyJson && bodyJson['role'] == 1) {
                            action = Action.CREATE_CONSULT_USER;
                        }
                    }

                    if (!action) {
                        action = Action.MANAGE_USER;
                    }
                }

                break;
        }

        if (!action) throw new Error("Invalid action");

        return action;
    }

    async vote(): Promise<Boolean> {
        if (this.token === this.config.rootToken) return true;

        let action: Action;
        try {
            action = await this.getAction();
        } catch (_ignore) {
            return false;
        }

        if ([Action.NOTHING, Action.CONSULT].includes(action)) return true;

        try {
            const response = await fetch(`${this.config.service.user}/access/${action.toString()}/${this.token}`);
            return response.status === 200;
        } catch (_ignore) {
            return false;
        }
    }

}

export enum Action {

    NOTHING = "",

    CONSULT = "CONSULT",

    CREATE_CONSULT_USER = "CREATE_CONSULT_USER",
    MANAGE_BORROW = "MANAGE_BORROW",

    MANAGE_BOOK_PUBLISHER_AUTHOR = "MANAGE_BOOK_PUBLISHER_AUTHOR",

    MANAGE_USER = "MANAGE_USER"
}