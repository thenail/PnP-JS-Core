import { TypedHash } from "../collections/collections";

export interface LibraryConfiguration {
    headers?: TypedHash<string>;
}

export class RuntimeConfigImpl {

    constructor() {
        this._headers = null;
    }

    private _headers: TypedHash<string>;

    public set(config: LibraryConfiguration): void {

        // add any headers that are supplied
        if (config.hasOwnProperty("headers")) {
            this._headers = config.headers;
        }
    }

    public get headers(): TypedHash<string> {
        return this._headers;
    }
}

let _runtimeConfig = new RuntimeConfigImpl();

export let RuntimeConfig = _runtimeConfig;

export function setRuntimeConfig(config: LibraryConfiguration): void {
    _runtimeConfig.set(config);
}
