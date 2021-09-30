export interface ServiceConfig {
    library: string;
    user: string;
    [key: string]: string;
}

export interface GlobalConfig {
    service: ServiceConfig;
    port: number;
    rootToken: string;
    timeoutDelay: number;
}