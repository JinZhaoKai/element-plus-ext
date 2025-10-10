import { buildProps } from '@element-plus/utils'

import type { ExtractPropTypes, __ExtractPublicPropTypes } from 'vue'

export const lsxmTableProps = buildProps({
  // 拖动模式
  draggable: {
    type: Boolean,
    default: false,
  },

  // 设置按钮是否显示，必须开启拖动模式
  settingBtn: {
    type: Boolean,
    default: true,
  },

  // 设置按钮位置
  settingPosition: {
    type: String,
    default: 'left-top',
  },

  // 配置不能拖动的属性，通过CSS选择器的方式配置
  filterDraggableSelector: {
    type: String,
    default:
      '.el-table-column--selection,.el-table-column--index,.el-table__expand-column',
  },

  // 表格列，当前显示的列
  columns: {
    type: Array<{ label: string; prop: string; width: string }>,
    default: [],
  },

  // 表格可选的列
  allColumns: {
    type: Array<{ label: string; prop: string; width: string }>,
    default: [],
  },

  // 设置按钮弹出层高度
  popoverHeight: {
    type: String,
    default: '30vh',
  },

  // 处理表格列变更
  handleColumnsChange: {
    type: Function,
    default: null,
  },

  // 处理表格列宽变化
  headerColumnWidthChange: {
    type: Function,
    default: null,
  },
} as const)
export type LsxmTableProps = ExtractPropTypes<typeof lsxmTableProps>
export type LsxmTablePropsPublic = __ExtractPublicPropTypes<
  typeof lsxmTableProps
>

export const lsxmTableEmits = {}
export type LsxmTableEmits = typeof lsxmTableEmits
