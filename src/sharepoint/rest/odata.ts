import { QueryableConstructor } from "./queryable";
import { Util } from "../../utils/util";
import { Logger } from "../../utils/logging";

export interface ODataParser<T, U> {
    parse(r: Response): Promise<U>;
}

export abstract class ODataParserBase<T, U> implements ODataParser<T, U> {

    public parse(r: Response): Promise<U> {

        return r.json().then(function (json) {

            if (json.hasOwnProperty("d")) {
                if (json.d.hasOwnProperty("results")) {
                    return json.d.results;
                }

                return json.d;

            } else if (json.hasOwnProperty("value")) {

                return json.value;
            }

            return json;
        });
    }
}

export class ODataDefaultParser extends ODataParserBase<any, any> {
}

export class ODataRawParserImpl implements ODataParser<any, any> {
    public parse(r: Response): Promise<any> {
        return r.json();
    }
}

class ODataValueParserImpl<T> extends ODataParserBase<any, T> {
    public parse(r: Response): Promise<T> {
        return super.parse(r).then(d => d as T);
    }
}

class ODataEntityParserImpl<T> extends ODataParserBase<T, T> {

    constructor(protected factory: QueryableConstructor<T>) {
        super();
    }

    public parse(r: Response): Promise<T> {
        return super.parse(r).then(d => {
            let o = new this.factory(getEntityUrl(d), null);
            return Util.extend(o, d);
        });
    }
}

class ODataEntityArrayParserImpl<T> extends ODataParserBase<T, T[]> {

    constructor(protected factory: QueryableConstructor<T>) {
        super();
    }

    public parse(r: Response): Promise<T[]> {
        return super.parse(r).then((d: any[]) => {
            return d.map(v => {
                let o = new this.factory(getEntityUrl(v), null);
                return Util.extend(o, v);
            });
        });
    }
}

function getEntityUrl(entity: any): string {

    if (entity.hasOwnProperty("__metadata")) {
        // we are dealing with verbose, which has an absolute uri
        return entity.__metadata.uri;
    } else if (entity.hasOwnProperty("odata.editLink")) {
        // we are dealign with minimal metadata (default)
        return Util.combinePaths("_api",  entity["odata.editLink"]);
    } else {
        // we are likely dealing with nometadata, so don't error but we won't be able to
        // chain off these objects (write something to log?)
        Logger.write("No uri information found in ODataEntity parsing, chaining will fail for this object.", Logger.LogLevel.Warning);
        return "";
    }
}

export let ODataRaw = new ODataRawParserImpl();

export function ODataValue<T>(): ODataParser<any, T> {
    return new ODataValueParserImpl<T>();
}

export function ODataEntity<T>(factory: QueryableConstructor<T>): ODataParser<T, T> {
    return new ODataEntityParserImpl(factory);
}

export function ODataEntityArray<T>(factory: QueryableConstructor<T>): ODataParser<T, T[]> {
    return new ODataEntityArrayParserImpl<T>(factory);
}
