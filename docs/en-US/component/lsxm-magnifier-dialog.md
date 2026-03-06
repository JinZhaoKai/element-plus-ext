---
title: LsxmMagnifierDialog
lang: en-US
---

# LsxmMagnifierDialog

Through the parameter configuration can open a dynamic rendering of the page.

## Basic usage

:::demo The v-model property needs to be set, it receives 'Boolean' and displays the Dialog when 'true. A simple page can be dynamically rendered through the 'search-param-prop and 'table-column-prop' attributes. Configure the 'table-remote-method' function to receive page query parameters to enable the remote search function (the value content returned by the interface is passed to the component through the second callback function parameter of 'table-remote-method', the first parameter is the query parameter).

lsxm-magnifier-dialog/basic-usage

:::

## API

### Lsxm Magnifier Dialog Attributes

| Name                  | Description                                                                                                                                                                                                                                                                                     | Type                                                          | Default |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------- |
| value / v-model       | Binding Value                                                                                                                                                                                                                                                                                   | ^[boolean]                                                    | —       |
| dialog-title          | Dialog Title                                                                                                                                                                                                                                                                                    | ^[string]                                                     | —       |
| dialog-width          | Dialog Width                                                                                                                                                                                                                                                                                    | ^[string]                                                     | 50%     |
| search-param-prop     | Required, Configuration of Search Parameters for Magnifier Dialog Table                                                                                                                                                                                                                         | ^[array]`Array<{[label: string]: any, [value: string]: any}>` | —       |
| table-column-prop     | Required, List of Magnifier Dialog Table Parameter Configuration                                                                                                                                                                                                                                | ^[array]`Array<{[label: string]: any, [value: string]: any}>` | —       |
| table-height          | The height of the magnifying glass dialog box Table. The default value is the automatic height. If height is of type number, unit px; If height is of type string, this height will be set to the value of style.height of Table, and the height of Table will be controlled by external style. | ^[string] / ^[number]                                         | —       |
| enable-page           | Whether to enable paging. After paging is enabled, the parameters passed to the interface carry the start and limit paging parameters.                                                                                                                                                          | ^[boolean]                                                    | —       |
| custom-page-component | Custom Dialog Component Name                                                                                                                                                                                                                                                                    | ^[string]                                                     | —       |
| table-remote-method   | The remote search method of the magnifying glass dialog box Table, the first parameter is the query parameter; The second parameter is a callback function, which is used to return the data queried by the interface. cb callback function parameter list Function(list, total)                | ^[Function]`(searchParams: Object, cb: Function) => void`     | —       |
| lsxm-confirm          | Used to return the selected value                                                                                                                                                                                                                                                               | ^[Function]`(val: Objct) => void`                             | —       |
| init-load             | Initialization Status                                                                                                                                                                                                                                                                           | ^[boolean]                                                    | true    |
| init-load-params      | Initialization Parameters                                                                                                                                                                                                                                                                       | ^[object]                                                     | {}      |
