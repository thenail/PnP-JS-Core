declare module "sharepoint/provisioning/provisioningstep" {
    /**
     * Describes a ProvisioningStep
     */
    export class ProvisioningStep {
        private name;
        private index;
        private objects;
        private parameters;
        private handler;
        /**
         * Executes the ProvisioningStep function
         *
         * @param dependentPromise The promise the ProvisioningStep is dependent on
         */
        execute(dependentPromise?: any): any;
        /**
         * Creates a new instance of the ProvisioningStep class
         */
        constructor(name: string, index: number, objects: any, parameters: any, handler: any);
    }
}
declare module "sharepoint/provisioning/util" {
    export class Util {
        /**
         * Make URL relative to host
         *
         * @param url The URL to make relative
         */
        static getRelativeUrl(url: string): string;
        /**
         * Replaces URL tokens in a string
         */
        static replaceUrlTokens(url: string): string;
        static encodePropertyKey(propKey: any): string;
    }
}
declare module "net/fetchClient" {
    import { HttpClientImpl } from "net/HttpClient";
    /**
     * Makes requests using the fetch API
     */
    export class FetchClient implements HttpClientImpl {
        fetch(url: string, options: any): Promise<Response>;
    }
}
declare module "utils/util" {
    export class Util {
        /**
         * Gets a callback function which will maintain context across async calls.
         * Allows for the calling pattern getCtxCallback(thisobj, method, methodarg1, methodarg2, ...)
         *
         * @param context The object that will be the 'this' value in the callback
         * @param method The method to which we will apply the context and parameters
         * @param params Optional, additional arguments to supply to the wrapped method when it is invoked
         */
        static getCtxCallback(context: any, method: Function, ...params: any[]): Function;
        /**
         * Tests if a url param exists
         *
         * @param name The name of the url paramter to check
         */
        static urlParamExists(name: string): boolean;
        /**
         * Gets a url param value by name
         *
         * @param name The name of the paramter for which we want the value
         */
        static getUrlParamByName(name: string): string;
        /**
         * Gets a url param by name and attempts to parse a bool value
         *
         * @param name The name of the paramter for which we want the boolean value
         */
        static getUrlParamBoolByName(name: string): boolean;
        /**
         * Inserts the string s into the string target as the index specified by index
         *
         * @param target The string into which we will insert s
         * @param index The location in target to insert s (zero based)
         * @param s The string to insert into target at position index
         */
        static stringInsert(target: string, index: number, s: string): string;
        /**
         * Adds a value to a date
         *
         * @param date The date to which we will add units, done in local time
         * @param interval The name of the interval to add, one of: ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second']
         * @param units The amount to add to date of the given interval
         *
         * http://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
         */
        static dateAdd(date: Date, interval: string, units: number): Date;
        /**
         * Loads a stylesheet into the current page
         *
         * @param path The url to the stylesheet
         * @param avoidCache If true a value will be appended as a query string to avoid browser caching issues
         */
        static loadStylesheet(path: string, avoidCache: boolean): void;
        /**
         * Combines an arbitrary set of paths ensuring that the slashes are normalized
         *
         * @param paths 0 to n path parts to combine
         */
        static combinePaths(...paths: string[]): string;
        /**
         * Gets a random string of chars length
         *
         * @param chars The length of the random string to generate
         */
        static getRandomString(chars: number): string;
        /**
         * Gets a random GUID value
         *
         * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
         */
        static getGUID(): string;
        /**
         * Determines if a given value is a function
         *
         * @param candidateFunction The thing to test for being a function
         */
        static isFunction(candidateFunction: any): boolean;
        /**
         * @returns whether the provided parameter is a JavaScript Array or not.
        */
        static isArray(array: any): boolean;
        /**
         * Determines if a string is null or empty or undefined
         *
         * @param s The string to test
         */
        static stringIsNullOrEmpty(s: string): boolean;
        /**
         * Provides functionality to extend the given object by doign a shallow copy
         *
         * @param target The object to which properties will be copied
         * @param source The source object from which properties will be copied
         * @param noOverwrite If true existing properties on the target are not overwritten from the source
         *
         */
        static extend<T, S>(target: T, source: S, noOverwrite?: boolean): T & S;
        /**
         * Applies one or more mixins to the supplied target
         *
         * @param derivedCtor The classto which we will apply the mixins
         * @param baseCtors One or more mixin classes to apply
         */
        static applyMixins(derivedCtor: any, ...baseCtors: any[]): void;
        /**
         * Determines if a given url is absolute
         *
         * @param url The url to check to see if it is absolute
         */
        static isUrlAbsolute(url: string): boolean;
    }
}
declare module "collections/collections" {
    /**
     * Interface defining an object with a known property type
     */
    export interface TypedHash<T> {
        [key: string]: T;
    }
    /**
     * Generic dictionary
     */
    export class Dictionary<T> {
        /**
         * Creates a new instance of the Dictionary<T> class
         *
         * @constructor
         */
        constructor();
        /**
         * The array used to store all the keys
         */
        private keys;
        /**
         * The array used to store all the values
         */
        private values;
        /**
         * Gets a value from the collection using the specified key
         *
         * @param key The key whose value we want to return, returns null if the key does not exist
         */
        get(key: string): T;
        /**
         * Adds the supplied key and value to the dictionary
         *
         * @param key The key to add
         * @param o The value to add
         */
        add(key: string, o: T): void;
        /**
         * Merges the supplied typed hash into this dictionary instance. Existing values are updated and new ones are created as appropriate.
         */
        merge(source: TypedHash<T> | Dictionary<T>): void;
        /**
         * Removes a value from the dictionary
         *
         * @param key The key of the key/value pair to remove. Returns null if the key was not found.
         */
        remove(key: string): T;
        /**
         * Returns all the keys currently in the dictionary as an array
         */
        getKeys(): string[];
        /**
         * Returns all the values currently in the dictionary as an array
         */
        getValues(): T[];
        /**
         * Clears the current dictionary
         */
        clear(): void;
        /**
         * Gets a count of the items currently in the dictionary
         */
        count(): number;
    }
}
declare module "net/digestCache" {
    import { Dictionary } from "collections/collections";
    import { HttpClient } from "net/HttpClient";
    export class CachedDigest {
        expiration: Date;
        value: string;
    }
    export class DigestCache {
        private _httpClient;
        private _digests;
        constructor(_httpClient: HttpClient, _digests?: Dictionary<CachedDigest>);
        getDigest(webUrl: string): Promise<string>;
        clear(): void;
    }
}
declare module "net/HttpClient" {
    import { FetchClient } from "net/fetchClient";
    export class HttpClient {
        private _impl;
        constructor(_impl?: FetchClient);
        private _digestCache;
        fetch(url: string, options?: any): Promise<Response>;
        fetchRaw(url: string, options?: any): Promise<Response>;
        get(url: string, options?: any): Promise<Response>;
        post(url: string, options?: any): Promise<Response>;
    }
    export interface HttpClientImpl {
        fetch(url: string, options: any): Promise<Response>;
    }
}
declare module "utils/logging" {
    import * as Collections from "collections/collections";
    /**
     * Interface that defines a log entry
     *
     */
    export interface LogEntry {
        /**
         * The main message to be logged
         */
        message: string;
        /**
         * The level of information this message represents
         */
        level: Logger.LogLevel;
        /**
         * Any associated data that a given logging listener may choose to log or ignore
         */
        data?: Collections.TypedHash<string>;
    }
    /**
     * Interface that defines a log listner
     *
     */
    export interface LogListener {
        /**
         * Any associated data that a given logging listener may choose to log or ignore
         *
         * @param entry The information to be logged
         */
        log(entry: LogEntry): void;
    }
    /**
     * Class used to subscribe ILogListener and log messages throughout an application
     *
     */
    export class Logger {
        private static _instance;
        static activeLogLevel: Logger.LogLevel;
        private static instance;
        /**
         * Adds an ILogListener instance to the set of subscribed listeners
         *
         * @param listeners One or more listeners to subscribe to this log
         */
        static subscribe(...listeners: LogListener[]): void;
        /**
         * Clears the subscribers collection, returning the collection before modifiction
         */
        static clearSubscribers(): LogListener[];
        /**
         * Gets the current subscriber count
         */
        static count: number;
        /**
         * Writes the supplied string to the subscribed listeners
         *
         * @param message The message to write
         * @param level [Optional] if supplied will be used as the level of the entry (Default: LogLevel.Verbose)
         */
        static write(message: string, level?: Logger.LogLevel): void;
        /**
         * Logs the supplied entry to the subscribed listeners
         *
         * @param entry The message to log
         */
        static log(entry: LogEntry): void;
        /**
         * Logs performance tracking data for the the execution duration of the supplied function using console.profile
         *
         * @param name The name of this profile boundary
         * @param f The function to execute and track within this performance boundary
         */
        static measure<T>(name: string, f: () => T): T;
    }
    /**
     * This module is merged with the Logger class and then exposed via the API as path of pnp.log
     */
    export module Logger {
        /**
         * A set of logging levels
         *
         */
        enum LogLevel {
            Verbose = 0,
            Info = 1,
            Warning = 2,
            Error = 3,
            Off = 99,
        }
        /**
         * Implementation of ILogListener which logs to the browser console
         *
         */
        class ConsoleListener implements LogListener {
            /**
             * Any associated data that a given logging listener may choose to log or ignore
             *
             * @param entry The information to be logged
             */
            log(entry: LogEntry): void;
            /**
             * Formats the message
             *
             * @param entry The information to format into a string
             */
            private format(entry);
        }
        /**
         * Implementation of ILogListener which logs to Azure Insights
         *
         */
        class AzureInsightsListener implements LogListener {
            private azureInsightsInstrumentationKey;
            /**
             * Creats a new instance of the AzureInsightsListener class
             *
             * @constructor
             * @param azureInsightsInstrumentationKey The instrumentation key created when the Azure Insights instance was created
             */
            constructor(azureInsightsInstrumentationKey: string);
            /**
             * Any associated data that a given logging listener may choose to log or ignore
             *
             * @param entry The information to be logged
             */
            log(entry: LogEntry): void;
            /**
             * Formats the message
             *
             * @param entry The information to format into a string
             */
            private format(entry);
        }
        /**
         * Implementation of ILogListener which logs to the supplied function
         *
         */
        class FunctionListener implements LogListener {
            private method;
            /**
             * Creates a new instance of the FunctionListener class
             *
             * @constructor
             * @param  method The method to which any logging data will be passed
             */
            constructor(method: (entry: LogEntry) => void);
            /**
             * Any associated data that a given logging listener may choose to log or ignore
             *
             * @param entry The information to be logged
             */
            log(entry: LogEntry): void;
        }
    }
}
declare module "sharepoint/provisioning/objecthandlers/objecthandlerbase" {
    import { HttpClient } from "net/HttpClient";
    /**
     * Describes the Object Handler Base
     */
    export class ObjectHandlerBase {
        httpClient: HttpClient;
        private name;
        /**
         * Creates a new instance of the ObjectHandlerBase class
         */
        constructor(name: string);
        /**
         * Provisioning objects
         */
        ProvisionObjects(objects: any, parameters?: any): Promise<{}>;
        /**
         * Writes to Logger when scope has started
         */
        scope_started(): void;
        /**
         * Writes to Logger when scope has stopped
         */
        scope_ended(): void;
    }
}
declare module "sharepoint/provisioning/schema/inavigationnode" {
    export interface INavigationNode {
        Title: string;
        Url: string;
        Children: Array<INavigationNode>;
    }
}
declare module "sharepoint/provisioning/schema/inavigation" {
    import { INavigationNode } from "sharepoint/provisioning/schema/inavigationnode";
    export interface INavigation {
        UseShared: boolean;
        QuickLaunch: Array<INavigationNode>;
    }
}
declare module "sharepoint/provisioning/objecthandlers/objectnavigation" {
    import { ObjectHandlerBase } from "sharepoint/provisioning/objecthandlers/objecthandlerbase";
    import { INavigation } from "sharepoint/provisioning/schema/inavigation";
    /**
     * Describes the Navigation Object Handler
     */
    export class ObjectNavigation extends ObjectHandlerBase {
        /**
         * Creates a new instance of the ObjectNavigation class
         */
        constructor();
        /**
         * Provision Navigation nodes
         *
         * @param object The navigation settings and nodes to provision
         */
        ProvisionObjects(object: INavigation): Promise<{}>;
        /**
         * Retrieves the node with the given title from a collection of SP.NavigationNode
         */
        private getNodeFromCollectionByTitle(nodeCollection, title);
        private ConfigureQuickLaunch(nodes, clientContext, httpClient, navigation);
    }
}
declare module "sharepoint/provisioning/schema/IPropertyBagEntry" {
    export interface IPropertyBagEntry {
        Key: string;
        Value: string;
        Indexed: boolean;
    }
}
declare module "sharepoint/provisioning/objecthandlers/objectpropertybagentries" {
    import { ObjectHandlerBase } from "sharepoint/provisioning/objecthandlers/objecthandlerbase";
    import { IPropertyBagEntry } from "sharepoint/provisioning/schema/IPropertyBagEntry";
    /**
     * Describes the Property Bag Entries Object Handler
     */
    export class ObjectPropertyBagEntries extends ObjectHandlerBase {
        /**
         * Creates a new instance of the ObjectPropertyBagEntries class
         */
        constructor();
        /**
         * Provision Property Bag Entries
         *
         * @param entries The entries to provision
         */
        ProvisionObjects(entries: Array<IPropertyBagEntry>): Promise<{}>;
    }
}
declare module "sharepoint/provisioning/schema/IFeature" {
    export interface IFeature {
        ID: string;
        Deactivate: boolean;
        Description: string;
    }
}
declare module "sharepoint/provisioning/objecthandlers/objectfeatures" {
    import { ObjectHandlerBase } from "sharepoint/provisioning/objecthandlers/objecthandlerbase";
    import { IFeature } from "sharepoint/provisioning/schema/IFeature";
    /**
     * Describes the Features Object Handler
     */
    export class ObjectFeatures extends ObjectHandlerBase {
        /**
         * Creates a new instance of the ObjectFeatures class
         */
        constructor();
        /**
         * Provisioning features
         *
         * @paramm features The features to provision
         */
        ProvisionObjects(features: Array<IFeature>): Promise<{}>;
    }
}
declare module "sharepoint/provisioning/schema/IWebSettings" {
    export interface IWebSettings {
        WelcomePage: string;
        AlternateCssUrl: string;
        SaveSiteAsTemplateEnabled: boolean;
        MasterUrl: string;
        CustomMasterUrl: string;
        RecycleBinEnabled: boolean;
        TreeViewEnabled: boolean;
        QuickLaunchEnabled: boolean;
    }
}
declare module "sharepoint/provisioning/objecthandlers/objectwebsettings" {
    import { ObjectHandlerBase } from "sharepoint/provisioning/objecthandlers/objecthandlerbase";
    import { IWebSettings } from "sharepoint/provisioning/schema/IWebSettings";
    /**
     * Describes the Web Settings Object Handler
     */
    export class ObjectWebSettings extends ObjectHandlerBase {
        /**
         * Creates a new instance of the ObjectWebSettings class
         */
        constructor();
        /**
         * Provision Web Settings
         *
         * @param object The Web Settings to provision
         */
        ProvisionObjects(object: IWebSettings): Promise<{}>;
    }
}
declare module "sharepoint/provisioning/schema/IComposedLook" {
    export interface IComposedLook {
        ColorPaletteUrl: string;
        FontSchemeUrl: string;
        BackgroundImageUrl: string;
    }
}
declare module "sharepoint/provisioning/objecthandlers/objectcomposedlook" {
    import { IComposedLook } from "sharepoint/provisioning/schema/IComposedLook";
    import { ObjectHandlerBase } from "sharepoint/provisioning/objecthandlers/objecthandlerbase";
    /**
     * Describes the Composed Look Object Handler
     */
    export class ObjectComposedLook extends ObjectHandlerBase {
        /**
         * Creates a new instance of the ObjectComposedLook class
         */
        constructor();
        /**
         * Provisioning Composed Look
         *
         * @param object The Composed Look to provision
         */
        ProvisionObjects(object: IComposedLook): Promise<{}>;
    }
}
declare module "sharepoint/provisioning/schema/ICustomAction" {
    export interface ICustomAction {
        CommandUIExtension: any;
        Description: string;
        Group: string;
        ImageUrl: string;
        Location: string;
        Name: string;
        RegistrationId: string;
        RegistrationType: any;
        Rights: any;
        ScriptBlock: string;
        ScriptSrc: string;
        Sequence: number;
        Title: string;
        Url: string;
    }
}
declare module "sharepoint/provisioning/objecthandlers/objectcustomactions" {
    import { ObjectHandlerBase } from "sharepoint/provisioning/objecthandlers/objecthandlerbase";
    import { ICustomAction } from "sharepoint/provisioning/schema/ICustomAction";
    /**
     * Describes the Custom Actions Object Handler
     */
    export class ObjectCustomActions extends ObjectHandlerBase {
        /**
         * Creates a new instance of the ObjectCustomActions class
         */
        constructor();
        /**
         * Provisioning Custom Actions
         *
         * @param customactions The Custom Actions to provision
         */
        ProvisionObjects(customactions: Array<ICustomAction>): Promise<{}>;
    }
}
declare module "sharepoint/provisioning/schema/IContents" {
    export interface IContents {
        Xml: string;
        FileUrl: string;
    }
}
declare module "sharepoint/provisioning/schema/IWebPart" {
    import { IContents } from "sharepoint/provisioning/schema/IContents";
    export interface IWebPart {
        Title: string;
        Order: number;
        Zone: string;
        Row: number;
        Column: number;
        Contents: IContents;
    }
}
declare module "sharepoint/provisioning/schema/IHiddenView" {
    export interface IHiddenView {
        List: string;
        Url: string;
        Paged: boolean;
        Query: string;
        RowLimit: number;
        Scope: number;
        ViewFields: Array<string>;
    }
}
declare module "sharepoint/provisioning/schema/IFile" {
    import { IWebPart } from "sharepoint/provisioning/schema/IWebPart";
    import { IHiddenView } from "sharepoint/provisioning/schema/IHiddenView";
    export interface IFile {
        Overwrite: boolean;
        Dest: string;
        Src: string;
        Properties: Object;
        RemoveExistingWebParts: boolean;
        WebParts: Array<IWebPart>;
        Views: Array<IHiddenView>;
    }
}
declare module "sharepoint/provisioning/objecthandlers/objectfiles" {
    import { ObjectHandlerBase } from "sharepoint/provisioning/objecthandlers/objecthandlerbase";
    import { IFile } from "sharepoint/provisioning/schema/IFile";
    /**
     * Describes the Files Object Handler
     */
    export class ObjectFiles extends ObjectHandlerBase {
        /**
         * Creates a new instance of the ObjectFiles class
         */
        constructor();
        /**
         * Provisioning Files
         *
         * @param objects The files to provisiion
         */
        ProvisionObjects(objects: Array<IFile>): Promise<{}>;
        private RemoveWebPartsFromFileIfSpecified(clientContext, limitedWebPartManager, shouldRemoveExisting);
        private GetWebPartXml(webParts);
        private AddWebPartsToWebPartPage(dest, src, webParts, shouldRemoveExisting);
        private ApplyFileProperties(dest, fileProperties);
        private GetViewFromCollectionByUrl(viewCollection, url);
        private ModifyHiddenViews(objects);
        private GetFolderFromFilePath(filePath);
        private GetFilenameFromFilePath(filePath);
    }
}
declare module "sharepoint/provisioning/sequencer/sequencer" {
    /**
     * Descibes a Sequencer
     */
    export class Sequencer {
        private functions;
        private parameter;
        private scope;
        /**
         * Creates a new instance of the Sequencer class, and declare private variables
         */
        constructor(functions: Array<any>, parameter: any, scope: any);
        /**
         * Executes the functions in sequence using DeferredObject
         */
        execute(progressFunction?: (s: Sequencer, index: number, functions: any[]) => void): Promise<void>;
    }
}
declare module "sharepoint/provisioning/schema/IFolder" {
    export interface IFolder {
        Name: string;
        DefaultValues: Object;
    }
}
declare module "sharepoint/provisioning/schema/IListInstanceFieldRef" {
    export interface IListInstanceFieldRef {
        Name: string;
    }
}
declare module "sharepoint/provisioning/schema/IField" {
    export interface IField {
        ShowInDisplayForm: boolean;
        ShowInEditForm: boolean;
        ShowInNewForm: boolean;
        CanBeDeleted: boolean;
        DefaultValue: string;
        Description: string;
        EnforceUniqueValues: boolean;
        Direction: string;
        EntityPropertyName: string;
        FieldTypeKind: any;
        Filterable: boolean;
        Group: string;
        Hidden: boolean;
        ID: string;
        Indexed: boolean;
        InternalName: string;
        JsLink: string;
        ReadOnlyField: boolean;
        Required: boolean;
        SchemaXml: string;
        StaticName: string;
        Title: string;
        TypeAsString: string;
        TypeDisplayName: string;
        TypeShortDescription: string;
        ValidationFormula: string;
        ValidationMessage: string;
        Type: string;
        Formula: string;
    }
}
declare module "sharepoint/provisioning/schema/IView" {
    export interface IView {
        Title: string;
        Paged: boolean;
        PersonalView: boolean;
        Query: string;
        RowLimit: number;
        Scope: number;
        SetAsDefaultView: boolean;
        ViewFields: Array<string>;
        ViewTypeKind: string;
    }
}
declare module "sharepoint/provisioning/schema/IRoleAssignment" {
    export interface IRoleAssignment {
        Principal: string;
        RoleDefinition: any;
    }
}
declare module "sharepoint/provisioning/schema/ISecurity" {
    import { IRoleAssignment } from "sharepoint/provisioning/schema/IRoleAssignment";
    export interface ISecurity {
        BreakRoleInheritance: boolean;
        CopyRoleAssignments: boolean;
        ClearSubscopes: boolean;
        RoleAssignments: Array<IRoleAssignment>;
    }
}
declare module "sharepoint/provisioning/schema/IContentTypeBinding" {
    export interface IContentTypeBinding {
        ContentTypeId: string;
    }
}
declare module "sharepoint/provisioning/schema/IListInstance" {
    import { IFolder } from "sharepoint/provisioning/schema/IFolder";
    import { IListInstanceFieldRef } from "sharepoint/provisioning/schema/IListInstanceFieldRef";
    import { IField } from "sharepoint/provisioning/schema/IField";
    import { IView } from "sharepoint/provisioning/schema/IView";
    import { ISecurity } from "sharepoint/provisioning/schema/ISecurity";
    import { IContentTypeBinding } from "sharepoint/provisioning/schema/IContentTypeBinding";
    export interface IListInstance {
        Title: string;
        Url: string;
        Description: string;
        DocumentTemplate: string;
        OnQuickLaunch: boolean;
        TemplateType: number;
        EnableVersioning: boolean;
        EnableMinorVersions: boolean;
        EnableModeration: boolean;
        EnableFolderCreation: boolean;
        EnableAttachments: boolean;
        RemoveExistingContentTypes: boolean;
        RemoveExistingViews: boolean;
        NoCrawl: boolean;
        DefaultDisplayFormUrl: string;
        DefaultEditFormUrl: string;
        DefaultNewFormUrl: string;
        DraftVersionVisibility: string;
        ImageUrl: string;
        Hidden: boolean;
        ForceCheckout: boolean;
        ContentTypeBindings: Array<IContentTypeBinding>;
        FieldRefs: Array<IListInstanceFieldRef>;
        Fields: Array<IField>;
        Folders: Array<IFolder>;
        Views: Array<IView>;
        DataRows: Array<Object>;
        Security: ISecurity;
    }
}
declare module "sharepoint/provisioning/objecthandlers/objectlists" {
    import { ObjectHandlerBase } from "sharepoint/provisioning/objecthandlers/objecthandlerbase";
    import { IListInstance } from "sharepoint/provisioning/schema/IListInstance";
    /**
     * Describes the Lists Object Handler
     */
    export class ObjectLists extends ObjectHandlerBase {
        /**
         * Creates a new instance of the ObjectLists class
         */
        constructor();
        /**
         * Provision Lists
         *
         * @param objects The lists to provision
         */
        ProvisionObjects(objects: Array<IListInstance>): Promise<{}>;
        private EnsureLocationBasedMetadataDefaultsReceiver(clientContext, list);
        private CreateFolders(params);
        private ApplyContentTypeBindings(params);
        private ApplyListInstanceFieldRefs(params);
        private ApplyFields(params);
        private ApplyLookupFields(params);
        private GetFieldXmlAttr(fieldXml, attr);
        private GetFieldXml(field, lists, list);
        private ApplyListSecurity(params);
        private CreateViews(params);
        private InsertDataRows(params);
    }
}
declare module "sharepoint/provisioning/schema/ISiteSchema" {
    import { IListInstance } from "sharepoint/provisioning/schema/IListInstance";
    import { ICustomAction } from "sharepoint/provisioning/schema/ICustomAction";
    import { IFeature } from "sharepoint/provisioning/schema/IFeature";
    import { IFile } from "sharepoint/provisioning/schema/IFile";
    import { INavigation } from "sharepoint/provisioning/schema/inavigation";
    import { IComposedLook } from "sharepoint/provisioning/schema/IComposedLook";
    import { IWebSettings } from "sharepoint/provisioning/schema/IWebSettings";
    export interface SiteSchema {
        Lists: Array<IListInstance>;
        Files: Array<IFile>;
        Navigation: INavigation;
        CustomActions: Array<ICustomAction>;
        ComposedLook: IComposedLook;
        PropertyBagEntries: Object;
        Parameters: Object;
        WebSettings: IWebSettings;
        Features: Array<IFeature>;
    }
}
declare module "sharepoint/provisioning/provisioning" {
    /**
     * Root class of Provisioning
     */
    export class Provisioning {
        private handlers;
        private httpClient;
        private startTime;
        private queueItems;
        /**
         * Creates a new instance of the Provisioning class
         */
        constructor();
        /**
         * Applies a JSON template to the current web
         *
         * @param path URL to the template file
         */
        applyTemplate(path: string): Promise<any>;
        /**
         * Starts the provisioning
         *
         * @param json The parsed template in JSON format
         * @param queue Array of Object Handlers to run
         */
        private start(json, queue);
    }
}
declare module "sharepoint/provisioning/schema/IContentType" {
    export interface IContentType {
        Name: string;
    }
}
