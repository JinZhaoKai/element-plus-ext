import { buildProps, definePropType } from '@element-plus/utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'

import type { ExtractPropTypes, __ExtractPublicPropTypes } from 'vue'
import type { OptionValue } from '@element-plus/components/select/src/type'

export const lsxmMagnifierProps = buildProps({
  modelValue: {
    type: definePropType<OptionValue | OptionValue[] | null>([
      Array,
      String,
      Number,
      Boolean,
      Object,
    ]),
    default: undefined,
  },
  /**
   * @description 输入框中返回的属性名
   */
  lsxmValueKey: {
    type: String,
    required: true,
  },
  /**
   * @description 对话框标题
   */
  dialogTitle: {
    type: String,
    default: '放大镜',
  },
  /**
   * @description 对话框宽度
   */
  dialogWidth: {
    type: String,
    default: '50%',
  },
  /**
   * @description 检索参数配置
   */
  searchParamProp: {
    type: Array<{ label: string; value: string }>,
    default() {
      return []
    },
  },
  /**
   * @description 表格列配置
   */
  tableColumnProp: {
    type: Array<{ label: string; value: string }>,
    default() {
      return []
    },
  },
  /**
   * @description 表格高度
   */
  tableHeight: {
    type: String,
    default: '300px',
  },
  /**
   * @description 输入框中显示的键名
   */
  labelKey: {
    type: String,
    default: 'value',
  },
  /**
   * @description 表格是否开启分页
   */
  enablePage: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 下拉框加载状态
   */
  selectLoading: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 自定义dialog page组件
   */
  customPageComponent: {
    type: String,
    default: 'ElLsxmMagnifierDefaultPage',
  },
  /**
   * @description 表格远程查询函数
   */
  tableRemoteMethod: Function,
} as const)
export type LsxmMagnifierProps = ExtractPropTypes<typeof lsxmMagnifierProps>
export type LsxmMagnifierPropsPublic = __ExtractPublicPropTypes<
  typeof lsxmMagnifierProps
>
/* eslint-disable @typescript-eslint/no-unused-vars */
export const lsxmMagnifierEmits = {
  [UPDATE_MODEL_EVENT]: (val: LsxmMagnifierProps['modelValue']) => true,
  [CHANGE_EVENT]: (val: LsxmMagnifierProps['modelValue']) => true,
  'remove-tag': (val: unknown) => true,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
}
/* eslint-enable @typescript-eslint/no-unused-vars */
export type LsxmMagnifierEmits = typeof lsxmMagnifierEmits
