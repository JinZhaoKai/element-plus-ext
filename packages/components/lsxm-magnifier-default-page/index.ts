import { withInstall } from '@element-plus/utils'
import LsxmMagnifierDefaultPage from './src/lsxm-magnifier-default-page.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElLsxmMagnifierDefaultPage: SFCWithInstall<
  typeof LsxmMagnifierDefaultPage
> = withInstall(LsxmMagnifierDefaultPage)
export default ElLsxmMagnifierDefaultPage

export * from './src/lsxm-magnifier-default-page'
export type { LsxmMagnifierDefaultPageInstance } from './src/instance'
