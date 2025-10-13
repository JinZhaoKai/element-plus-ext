---
title: LsxmTable
lang: en-US
---

# LsxmTable

The functions of dragging and sorting columns and customizing columns are extended on the basis of `el-table`. The
dragging function is implemented based on Sortable. The current document only describes the usage and configuration of
dragging tables. For the usage of native tables, please refer to the native document.

## Basic usage

:::demo Table columns can be dragged to show the usage.

lsxm-table/basic-usage

:::

## Custom width

:::demo Table columns can be dragged to show the usage.

lsxm-table/custom-width

:::

## Table API

### Table Attributes

| Name                       | Description                                                                                   | Type                                                                                      | Default                                                                        |
| -------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| draggable                  | Whether drag is enabled                                                                       | ^[boolean]                                                                                | false                                                                          |
| setting-btn                | Set whether the button is displayed. It cannot be displayed without turning on the drag mode. | ^[boolean]                                                                                | false                                                                          |
| setting-position           | Set button position                                                                           | ^[string]`'left-top' \| 'right-top'`                                                      | left-top                                                                       |
| filter-draggable-selector  | Filter columns that cannot be dragged                                                         | ^[string]                                                                                 | .el-table-column--selection,.el-table-column--index,.el-table\_\_expand-column |
| columns                    | Dynamic table columns for display                                                             | ^[array]`Array<{ label: string; prop: string; width: string }>`                           | []                                                                             |
| all-columns                | Optional All Table Columns                                                                    | ^[array]`Array<{ label: string; prop: string; width: string }>`                           | []                                                                             |
| popover-height             | Set button popup layer height                                                                 | ^[string]                                                                                 | 30vh                                                                           |
| handle-columns-change      | Triggered when table columns change and column widths change                                  | ^[Function]`(Array: { label: string; prop: string; width: string })`                      | null                                                                           |
| header-column-width-change | Triggered when table column width changes (based on native header-dragend implementation)     | ^[Function]`(newWidth: number, oldWidth: number, column: any, event: MouseEvent) => void` | null                                                                           |

### Table Exposes

| Method            | Description                                                                                                                                                      | Type                    |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| getSourceTableRef | When you want to call methods such as table toggleRowSelection, you need to use getSourceTableRef to get the Ref object of the source table to successfully call | ^[Function]`() => void` |
