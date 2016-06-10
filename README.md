![Office 365 Developer Patterns and Practices](https://camo.githubusercontent.com/a732087ed949b0f2f84f5f02b8c79f1a9dd96f65/687474703a2f2f692e696d6775722e636f6d2f6c3031686876452e706e67)

# JavaScript Core Component #

[![npm version](https://badge.fury.io/js/sp-pnp-js.svg)](https://badge.fury.io/js/sp-pnp-js) [![Join the chat at https://gitter.im/OfficeDev/PnP-JS-Core](https://badges.gitter.im/OfficeDev/PnP-JS-Core.svg)](https://gitter.im/OfficeDev/PnP-JS-Core?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Downloads](https://img.shields.io/npm/dm/sp-pnp-js.svg)](https://www.npmjs.com/package/sp-pnp-js)

This repository contains a reusable [TypeScript](https://github.com/Microsoft/TypeScript) library to make interacting with SharePoint from client applications simple. It is also distributed as a npm and bower package for easy integration into you applications. This is a "sub" repository for the [PnP repository](https://github.com/OfficeDev/PnP).


Please use [http://aka.ms/OfficeDevPnP](http://aka.ms/OfficeDevPnP) for getting latest information around the whole *Office 365 Developer Patterns and Practices program*.

### Get Started ###

**NPM**

Add the npm package to your project

    npm install sp-pnp-js --save dev

Import the root object and start interacting with the SharePoint REST API

    import pnp from "sp-pnp-js"
	...
	pnp.sp.web.select("Title").get().then(() => ...);

**Bower**

Add the package from bower

    bower install sp-pnp-js


### Get Help ###

We have active [Yammer](http://aka.ms/OfficeDevPnPSIGJavaScriptYammer) and [Gitter](https://gitter.im/OfficeDev/PnP-JS-Core) communities dedicated to this library, please join the conversation to ask questions. If you find an issue with the library, please [report it](https://github.com/OfficeDev/PnP-JS-Core/issues).



### Wiki ###

Please see [the wiki](https://github.com/OfficeDev/PnP-JS-Core/wiki) for tips on getting started, configuring your development environment, and using the library.


### Authors ###
This project's contributors include Microsoft and [community contributors](AUTHORS). Work is done as as open source community project. 


###"Sharing is Caring"###
----------
### Disclaimer ###
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**









