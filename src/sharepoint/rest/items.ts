"use strict";

import { Queryable, QueryableCollection, QueryableInstance } from "./queryable";
import { QueryableSecurable } from "./queryablesecurable";
import { Folder } from "./folders";
import { ContentType } from "./contenttypes";
import { TypedHash } from "../../collections/collections";
import { Util } from "../../utils/util";
import * as Types from "./types";
import { ODataParserBase } from "./odata";

/**
 * Describes a collection of Item objects
 *
 */
export class Items extends QueryableCollection {

    /**
     * Creates a new instance of the Items class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    constructor(baseUrl: string | Queryable, path = "items") {
        super(baseUrl, path);
    }

    /**
     * Gets an Item by id
     *
     * @param id The integer id of the item to retrieve
     */
    public getById(id: number): Item {
        let i = new Item(this);
        i.concat(`(${id})`);
        return i;
    }

    /**
     * Skips the specified number of items (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#sectionSection6)
     * 
     * @param skip The starting id where the page should start, use with top to specify pages
     */
    public skip(skip: number): QueryableCollection {
        this._query.add("$skiptoken", encodeURIComponent(`Paged=TRUE&p_ID=${skip}`));
        return this;
    }

    /**
     * Gets a collection designed to aid in paging through data
     * 
     */
    public getPaged(): Promise<PagedItemCollection<any>> {
        return this.getAs(new PagedItemCollectionParser());
    }

    /**
     * Adds a new item to the collection
     *
     * @param properties The new items's properties
     */
    public add(properties: TypedHash<string | number | boolean> = {}): Promise<ItemAddResult> {

        let parentList = this.getParent(QueryableInstance);

        return parentList.select("ListItemEntityTypeFullName").getAs<any, { ListItemEntityTypeFullName: string }>().then((d) => {

            let postBody = JSON.stringify(Util.extend({
                "__metadata": { "type": d.ListItemEntityTypeFullName },
            }, properties));

            return this.postAs<any, { Id: number }>({ body: postBody }).then((data) => {
                return {
                    data: data,
                    item: this.getById(data.Id),
                };
            });
        });
    }
}

class PagedItemCollectionParser extends ODataParserBase<any, PagedItemCollection<any>> {
    public parse(r: Response): Promise<PagedItemCollection<any>> {
        return PagedItemCollection.fromResponse(r);
    }
}

/**
 * Descrines a single Item instance
 *
 */
export class Item extends QueryableSecurable {

    /**
     * Creates a new instance of the Items class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    constructor(baseUrl: string | Queryable, path?: string) {
        super(baseUrl, path);
    }

    /**
     * Gets the set of attachments for this item
     *
     */
    public get attachmentFiles(): QueryableCollection {
        return new QueryableCollection(this, "AttachmentFiles");
    }

    /**
     * Gets the content type for this item
     *
     */
    public get contentType(): ContentType {
        return new ContentType(this, "ContentType");
    }

    /**
     * Gets the effective base permissions for the item
     *
     */
    public get effectiveBasePermissions(): Queryable {
        return new Queryable(this, "EffectiveBasePermissions");
    }

    /**
     * Gets the effective base permissions for the item in a UI context
     *
     */
    public get effectiveBasePermissionsForUI(): Queryable {
        return new Queryable(this, "EffectiveBasePermissionsForUI");
    }

    /**
     * Gets the field values for this list item in their HTML representation
     *
     */
    public get fieldValuesAsHTML(): QueryableInstance {
        return new QueryableInstance(this, "FieldValuesAsHTML");
    }

    /**
     * Gets the field values for this list item in their text representation
     *
     */
    public get fieldValuesAsText(): QueryableInstance {
        return new QueryableInstance(this, "FieldValuesAsText");
    }

    /**
     * Gets the field values for this list item for use in editing controls
     *
     */
    public get fieldValuesForEdit(): QueryableInstance {
        return new QueryableInstance(this, "FieldValuesForEdit");
    }

    /**
     * Gets the folder associated with this list item (if this item represents a folder)
     *
     */
    public get folder(): Folder {
        return new Folder(this, "Folder");
    }

    /**
     * Updates this list intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    public update(properties: TypedHash<string | number | boolean>, eTag = "*"): Promise<ItemUpdateResult> {

        let parentList = this.getParent(QueryableInstance, this.parentUrl.substr(0, this.parentUrl.lastIndexOf("/")));

        return parentList.select("ListItemEntityTypeFullName").getAs<any, { ListItemEntityTypeFullName: string }>().then((d) => {

            let postBody = JSON.stringify(Util.extend({
                "__metadata": { "type": d.ListItemEntityTypeFullName },
            }, properties));

            return this.post({
                body: postBody,
                headers: {
                    "IF-Match": eTag,
                    "X-HTTP-Method": "MERGE",
                },
            }).then((data) => {
                return {
                    data: data,
                    item: this,
                };
            });
        });
    }

    /**
     * Delete this item
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    public delete(eTag = "*"): Promise<void> {
        return this.post({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    }

    /**
     * Moves the list item to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    public recycle(): Promise<string> {
        let i = new Item(this, "recycle");
        return i.post();
    }

    /**
     * Validates and sets the values of the specified collection of fields for the list item.
     *
     * @param formValues The fields to change and their new values.
     * @param newDocumentUpdate true if the list item is a document being updated after upload; otherwise false.
     */
    /* tslint:disable max-line-length */
    public validateUpdateListItem(formValues: Types.ListItemFormUpdateValue[], newDocumentUpdate = false): Promise<Types.ListItemFormUpdateValue[]> {
        let postBody = JSON.stringify({ "formValues": formValues, bNewDocumentUpdate: newDocumentUpdate });
        let item = new Item(this, "validateupdatelistitem");
        return item.post({ body: postBody });
    }
    /* tslint:enable */
}

export interface ItemAddResult {
    item: Item;
    data: any;
}

export interface ItemUpdateResult {
    item: Item;
    data: any;
}

/**
 * Provides paging functionality for list items
 */
export class PagedItemCollection<T> {

    /**
     * Contains the results of the query
     */
    public results: T;

    /**
     * The url to the next set of results
     */
    private nextUrl: string;

    /**
     * If true there are more results available in the set, otherwise there are not
     */
    public get hasNext(): boolean {
        return typeof this.nextUrl === "string" && this.nextUrl.length > 0;
    }

    /**
     * Creats a new instance of the PagedItemCollection class from the response
     * 
     * @param r Response instance from which this collection will be created
     * 
     */
    public static fromResponse(r: Response): Promise<PagedItemCollection<any>> {
        return r.json().then(d => {
            let col = new PagedItemCollection();
            col.nextUrl = d["odata.nextLink"];
            col.results = d.value;
            return col;
        });
    }

    /**
     * Gets the next set of results, or resolves to null if no results are available
     */
    public getNext(): Promise<PagedItemCollection<any>> {

        if (this.hasNext) {
            let items = new Items(this.nextUrl, null);
            return items.getPaged();
        }

        return new Promise<any>(r => r(null));
    }
}
