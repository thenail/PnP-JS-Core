"use strict";

import { Queryable, QueryableInstance } from "./queryable";
import { Web } from "./webs";
import { UserCustomActions } from "./usercustomactions";

/**
 * Describes a site collection
 * 
 */
export class Site extends QueryableInstance {

    /**
     * Creates a new instance of the RoleAssignments class
     * 
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    constructor(baseUrl: string | Queryable, path = "_api/site") {
        super(baseUrl, path);
    }

    /**
     * Gets the root web of the site collection
     * 
     */
    public get rootWeb(): Web {
        return new Web(this, "rootweb");
    }

    /**
     * Get all custom actions on a site collection
     * 
     */
    public get userCustomActions(): UserCustomActions {
        return new UserCustomActions(this);
    }

    /**
     * Gets the context information for the site.
     */
    public getContextInfo(): Promise<any> {
        let q = new Site("", "_api/contextinfo");
        return q.post();
    }

    /**
     * Gets the document libraries on a site. Static method. (SharePoint Online only)
     * 
     * @param absoluteWebUrl The absolute url of the web whose document libraries should be returned
     */
    public getDocumentLibraries(absoluteWebUrl: string): Promise<any> {
        let q = new Queryable("_api/sp.web.getdocumentlibraries(@v)");
        q.query.add("@v", "'" + absoluteWebUrl + "'");
        return q.get();
    }

    /**
     * Gets the site URL from a page URL.
     * 
     * @param absolutePageUrl The absolute url of the page
     */
    public getWebUrlFromPageUrl(absolutePageUrl: string): Promise<string> {
        let q = new Queryable("_api/sp.web.getweburlfrompageurl(@v)");
        q.query.add("@v", "'" + absolutePageUrl + "'");
        return q.get();
    }
}
