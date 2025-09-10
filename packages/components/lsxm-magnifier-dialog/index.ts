import { withInstall } from '@element-plus/utils'
import LsxmMagnifierDialog from './src/lsxm-magnifier-dialog.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElLsxmMagnifierDialog: SFCWithInstall<typeof LsxmMagnifierDialog> =
  withInstall(LsxmMagnifierDialog)
export default ElLsxmMagnifierDialog

export * from './src/lsxm-magnifier-dialog'
export type { LsxmMagnifierDialogInstance } from './src/instance'
