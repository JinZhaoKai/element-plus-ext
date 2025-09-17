import { buildProps, isBoolean } from '@element-plus/utils'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'

import type { ExtractPropTypes, __ExtractPublicPropTypes } from 'vue'

export const lsxmMagnifierDialogProps = buildProps({
  /**
   * @description visibility of Dialog
   */
  modelValue: Boolean,
  // 对话框标题
  dialogTitle: {
    type: String,
    default: '放大镜',
  },
  // 对话框宽度
  dialogWidth: {
    type: String,
    default: '50%',
  },
  // 检索参数配置
  searchParamProp: {
    type: Array<{ label: string; value: string }>,
    default() {
      return []
    },
  },
  // 表格列配置
  tableColumnProp: {
    type: Array<{ label: string; value: string }>,
    default() {
      return []
    },
  },
  // 表格高度
  tableHeight: {
    type: String,
    default: '300px',
  },
  // 表格是否开启分页
  enablePage: {
    type: Boolean,
    default: true,
  },
  // 自定义dialog page组件
  customPageComponent: {
    type: String,
    default: 'ElLsxmMagnifierDefaultPage',
  },
  // 表格远程查询函数
  tableRemoteMethod: Function,
  // 确认函数
  lsxmConfirm: {
    type: Function,
    required: true,
  },
} as const)
export type LsxmMagnifierDialogProps = ExtractPropTypes<
  typeof lsxmMagnifierDialogProps
>
export type LsxmMagnifierDialogPropsPublic = __ExtractPublicPropTypes<
  typeof lsxmMagnifierDialogProps
>

export const lsxmMagnifierDialogEmits = {
  [UPDATE_MODEL_EVENT]: (value: boolean) => isBoolean(value),
}
export type LsxmMagnifierDialogEmits = typeof lsxmMagnifierDialogEmits
