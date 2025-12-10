---
title: LsxmMagnifier
lang: en-US
---

# LsxmMagnifier

When there are plenty of options, use a drop-down menu to display and select desired ones.

:::tip

Display the magnifying glass. By default, the magnifying glass is a select that supports remote search. Click the magnifying glass icon on the right side of the input box to pop up a dialog box that supports more query conditions and displays more content.

:::

## Basic usage

:::demo The value of the v-model is the value of the selected row with the key name lsxm-value-key. Here, the id is used as the value of the v-model. The 'label-key' sets what is displayed in the input box after selection. 'table-column-prop' supports dynamic configuration of columns displayed in drop-down boxes and tables. The search-param-prop supports dynamic configuration of the search parameters of the table. 'remote-method' and 'table-remote-method' are the remote query methods for the drop-down box and table, respectively.

lsxm-magnifier/basic-usage

:::

## custom label

:::demo You can customize label.

lsxm-magnifier/custom-label

:::

## value obj

:::demo Value is object.

lsxm-magnifier/value-obj

:::

## init data

:::demo Initialization data.

lsxm-magnifier/init-data

:::

## Select API

### Extends Select Attributes

| Name                  | Description                                                                                                                              | Type                                                      | Default |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------- |
| model-value / v-model | binding value                                                                                                                            | ^[string] / ^[number] / ^[boolean] / ^[object] / ^[array] | —       |
| multiple              | whether multiple-select is activated                                                                                                     | ^[boolean]                                                | false   |
| disabled              | whether Select is disabled                                                                                                               | ^[boolean]                                                | false   |
| value-key             | unique identity key name for value, required when value is an object                                                                     | ^[string]                                                 | value   |
| size                  | size of Input                                                                                                                            | ^[enum]`'' \| 'large' \| 'default' \| 'small'`            | —       |
| collapse-tags         | whether to collapse tags to a text when multiple selecting                                                                               | ^[boolean]                                                | false   |
| multiple-limit        | maximum number of options user can select when `multiple` is `true`. No limit when set to 0                                              | ^[number]                                                 | 0       |
| name                  | the name attribute of select input                                                                                                       | ^[string]                                                 | —       |
| placeholder           | placeholder, default is 'Select'                                                                                                         | ^[string]                                                 | —       |
| remote-method         | function that gets called when the input value changes. Its parameter is the current input value. To use this, `filterable` must be true | ^[Function]`(query: string) => void`                      | —       |
| loading-text          | displayed text while loading data from server, default is 'Loading'                                                                      | ^[string]                                                 | —       |
| no-match-text         | displayed text when no data matches the filtering query, you can also use slot `empty`, default is 'No matching data'                    | ^[string]                                                 | —       |
| no-data-text          | displayed text when there is no options, you can also use slot `empty`, default is 'No data'                                             | ^[string]                                                 | —       |
| popper-class          | custom class name for Select's dropdown                                                                                                  | ^[string]                                                 | ''      |

### Lsxm Select Attributes

| Name                  | Description                                                                                                                                                                                                                                                                                     | Type                                                          | Default |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------- |
| lsxm-value-key        | Required. It is the key name uniquely identified by the magnifying glass. If the magnifying glass returns the object type, the native value-key attribute must be set.                                                                                                                          | ^[string]                                                     | —       |
| label-key             | Required, the value of the selected state                                                                                                                                                                                                                                                       | ^[string]                                                     | —       |
| dialog-title          | Dialog Title                                                                                                                                                                                                                                                                                    | ^[string]                                                     | —       |
| dialog-width          | Dialog Width                                                                                                                                                                                                                                                                                    | ^[string]                                                     | 50%     |
| search-param-prop     | Required, Configuration of Search Parameters for Magnifier Dialog Table                                                                                                                                                                                                                         | ^[array]`Array<{[label: string]: any, [value: string]: any}>` | —       |
| table-column-prop     | Required, List of Magnifier Dialog Table Parameter Configuration                                                                                                                                                                                                                                | ^[array]`Array<{[label: string]: any, [value: string]: any}>` | —       |
| table-height          | The height of the magnifying glass dialog box Table. The default value is the automatic height. If height is of type number, unit px; If height is of type string, this height will be set to the value of style.height of Table, and the height of Table will be controlled by external style. | ^[string] / ^[number]                                         | —       |
| enable-page           | Whether to enable paging. After paging is enabled, the parameters passed to the interface carry the start and limit paging parameters.                                                                                                                                                          | ^[boolean]                                                    | —       |
| custom-page-component | Custom Dialog Component Name                                                                                                                                                                                                                                                                    | ^[string]                                                     | —       |
| select-loading        | Whether data is being fetched remotely                                                                                                                                                                                                                                                          | ^[boolean]                                                    | —       |
| table-remote-method   | The remote search method of the magnifying glass dialog box Table, the first parameter is the query parameter; The second parameter is a callback function, which is used to return the data queried by the interface. cb callback function parameter list Function(list, total)                | ^[Function]`(searchParams: Object, cb: Function) => void`     | —       |
| init-load             | Initialization Status                                                                                                                                                                                                                                                                           | ^[boolean]                                                    | true    |
| init-load-params      | Initialization Parameters                                                                                                                                                                                                                                                                       | ^[object]                                                     | {}      |

### Extends Select Events

| Name       | Description                                     | Type                                     |
| ---------- | ----------------------------------------------- | ---------------------------------------- |
| change     | triggers when the selected value changes        | ^[Function]`(value: any) => void`        |
| remove-tag | triggers when a tag is removed in multiple mode | ^[Function]`(tagValue: any) => void`     |
| blur       | triggers when Input blurs                       | ^[Function]`(event: FocusEvent) => void` |
| focus      | triggers when Input focuses                     | ^[Function]`(event: FocusEvent) => void` |

### Lsxm Select Slots

| Name                       | Description             | Subtags |
| -------------------------- | ----------------------- | ------- |
| custom-label ^(2.10.5-0.5) | content as Select label | —       |
