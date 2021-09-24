export namespace ConfigModule {

    export interface Service {
        library: string;
        user: string;
        [key: string]: string;
    }

    export interface Config {
        service: Service;
        port: number;
    }
}