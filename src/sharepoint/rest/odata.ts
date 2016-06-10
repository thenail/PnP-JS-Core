import { QueryableConstructor } from "./queryable";
import { Util } from "../../utils/util";

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
            let o = new this.factory(Util.combinePaths("_api", d["odata.editLink"]), null);
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
                let o = new this.factory(Util.combinePaths("_api", v["odata.editLink"]), null);
                return Util.extend(o, v);
            });
        });
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
