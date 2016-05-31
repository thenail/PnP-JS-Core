import { Queryable, QueryableInstance, QueryableCollection } from "./queryable";
import { Util } from "../../utils/util";
import { TypedHash } from "../../collections/collections";

export class UserCustomActions extends QueryableCollection {
    constructor(baseUrl: string | Queryable, path = "usercustomactions") {
        super(baseUrl, path);
    }


    /**
     * Returns the custom action with the specified identifier.
     *
     * @param id The GUID ID of the user custom action to get.
     */
    public getById(id: string): UserCustomAction {
        return new UserCustomAction(this, `(${id})`);
    }

    /**
     * Create a custom action
     * 
     * @param creationInfo The information which defines the new custom action
     * 
     */
    public add(properties: TypedHash<string | boolean | number>): Promise<UserCustomActionAddResult> {

        let postBody = JSON.stringify(Util.extend({ __metadata: { "type": "SP.UserCustomAction" } }, properties));

        return this.post({ body: postBody }).then((data) => {
            return {
                action: this.getById(data.Id),
                data: data,
            };
        });
    }

    /**
     * Deletes all custom actions in the collection.
     * 
     */
    public clear(): Promise<void> {
        let a = new UserCustomActions(this, "clear");
        return a.post();
    }
}

export class UserCustomAction extends QueryableInstance {

    constructor(baseUrl: string | Queryable, path?: string) {
        super(baseUrl, path);
    }

    public update(properties: TypedHash<string | boolean | number>): Promise<UserCustomActionUpdateResult> {

        let postBody = JSON.stringify(Util.extend({
            "__metadata": { "type": "SP.UserCustomAction" },
        }, properties));

        return this.post({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then((data) => {
            return {
                action: this,
                data: data,
            };
        });
    }
}

export interface UserCustomActionAddResult {
    data: any;
    action: UserCustomAction;
}

export interface UserCustomActionUpdateResult {
    data: any;
    action: UserCustomAction;
}
