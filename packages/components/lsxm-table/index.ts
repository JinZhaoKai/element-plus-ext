import { withInstall } from '@element-plus/utils'
import LsxmTable from './src/lsxm-table.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElLsxmTable: SFCWithInstall<typeof LsxmTable> =
  withInstall(LsxmTable)
export default ElLsxmTable

export * from './src/lsxm-table'
export type { LsxmTableInstance } from './src/instance'
