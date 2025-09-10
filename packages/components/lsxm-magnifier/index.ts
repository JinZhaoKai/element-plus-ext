import { withInstall } from '@element-plus/utils'
import LsxmMagnifier from './src/lsxm-magnifier.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElLsxmMagnifier: SFCWithInstall<typeof LsxmMagnifier> =
  withInstall(LsxmMagnifier)
export default ElLsxmMagnifier

export * from './src/lsxm-magnifier'
export type { LsxmMagnifierInstance } from './src/instance'
