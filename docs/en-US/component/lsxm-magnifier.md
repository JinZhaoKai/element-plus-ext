---
title: LsxmMagnifier
lang: en-US
---

# LsxmMagnifier

When there are plenty of options, use a drop-down menu to display and select desired ones.

:::tip

After version ^(2.5.0), the default width of `el-select` changed to `100%`. When used in a inline form, the width will collapse. In order to display the width properly, you need to give `el-select` a specific width (eg: [Example](https://github.com/element-plus/element-plus/issues/15834#issuecomment-1936919229)) .

:::

## Basic usage

:::demo `v-model` is the value of `el-option` that is currently selected.

lsxm-magnifier/basic-usage

### Select Events

| Name                  | Description                                                   | Type                                                                |
| --------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------- |
| change                | triggers when the selected value changes                      | ^[Function]`(value: any) => void`                                   |
| visible-change        | triggers when the dropdown appears/disappears                 | ^[Function]`(visible: boolean) => void`                             |
| remove-tag            | triggers when a tag is removed in multiple mode               | ^[Function]`(tagValue: any) => void`                                |
| clear                 | triggers when the clear icon is clicked in a clearable Select | ^[Function]`() => void`                                             |
| blur                  | triggers when Input blurs                                     | ^[Function]`(event: FocusEvent) => void`                            |
| focus                 | triggers when Input focuses                                   | ^[Function]`(event: FocusEvent) => void`                            |
| popup-scroll ^(2.9.4) | triggers when dropdown scrolls                                | ^[Function]`(data:{scrollTop: number, scrollLeft: number}) => void` |

### Select Slots

| Name                 | Description                                                                                     | Subtags                                                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| default              | option component list                                                                           | Option Group / Option                                                                                                                         |
| header ^(2.4.3)      | content at the top of the dropdown                                                              | —                                                                                                                                             |
| footer ^(2.4.3)      | content at the bottom of the dropdown                                                           | —                                                                                                                                             |
| prefix               | content as Select prefix                                                                        | —                                                                                                                                             |
| empty                | content when there is no options                                                                | —                                                                                                                                             |
| tag ^(2.5.0)         | content as Select tag, subTags `data`, `selectDisabled` and `deleteTag` introduced in ^(2.10.3) | ^[object]`{ data: OptionBasic[], selectDisabled: boolean, deleteTag: (event: MouseEvent, tag: OptionPublicInstance \| OptionBasic) => void }` |
| loading ^(2.5.2)     | content as Select loading                                                                       | —                                                                                                                                             |
| label ^(2.7.4)       | content as Select label                                                                         | —                                                                                                                                             |
| suffix ^(2.10.5-0.1) | content as Select suffix                                                                        | —                                                                                                                                             |

### Select Exposes

| Name                   | Description                                     | Type                                       |
| ---------------------- | ----------------------------------------------- | ------------------------------------------ |
| focus                  | focus the Input component                       | ^[Function]`() => void`                    |
| blur                   | blur the Input component, and hide the dropdown | ^[Function]`() => void`                    |
| selectedLabel ^(2.8.5) | get the currently selected label                | ^[object]`ComputedRef<string \| string[]>` |

## Option Group API

### Option Group Attributes

| Name     | Description                                  | Type       | Default |
| -------- | -------------------------------------------- | ---------- | ------- |
| label    | name of the group                            | ^[string]  | —       |
| disabled | whether to disable all options in this group | ^[boolean] | false   |

### Option Group Slots

| Name    | Description               | Subtags |
| ------- | ------------------------- | ------- |
| default | customize default content | Option  |

## Option API

### Option Attributes

| Name     | Description                                 | Type                                           | Default |
| -------- | ------------------------------------------- | ---------------------------------------------- | ------- |
| value    | value of option                             | ^[string] / ^[number] / ^[boolean] / ^[object] | —       |
| label    | label of option, same as `value` if omitted | ^[string] / ^[number]                          | —       |
| disabled | whether option is disabled                  | ^[boolean]                                     | false   |

### Option Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | customize default content |
