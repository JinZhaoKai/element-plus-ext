import { buildProps } from '@element-plus/utils'

import type { ExtractPropTypes, __ExtractPublicPropTypes } from 'vue'

export const lsxmMagnifierDefaultPageProps = buildProps({
  // 检索参数配置
  searchParamProp: {
    type: Array<{ label: string; value: string }>,
    default() {
      return []
    },
  },
  // 表格列配置
  tableColumnProp: {
    type: Array<{ label: string; value: string; width: any }>,
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
  enablePage: Boolean,
  // 表格是否支持多选
  multiple: Boolean,
  // 表格远程查询函数
  tableRemoteMethod: Function,
} as const)
export type LsxmMagnifierDefaultPageProps = ExtractPropTypes<
  typeof lsxmMagnifierDefaultPageProps
>
export type LsxmMagnifierDefaultPagePropsPublic = __ExtractPublicPropTypes<
  typeof lsxmMagnifierDefaultPageProps
>
export const lsxmMagnifierDefaultPageEmits = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  'lsxm-confirm': (val: any) => true,
}
export type LsxmMagnifierDefaultPageEmits = typeof lsxmMagnifierDefaultPageEmits
