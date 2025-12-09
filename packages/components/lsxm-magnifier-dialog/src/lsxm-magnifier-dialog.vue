<template>
  <div class="el-lsxm-magnifier-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :width="dialogWidth"
      :close-on-click-modal="false"
      append-to-body
      @close="onCancel"
    >
      <component
        :is="customPageComponent"
        ref="magnifierRef"
        :search-param-prop="searchParamProp"
        :table-column-prop="tableColumnProp"
        :enable-page="enablePage"
        :multiple="attrs.multiple"
        :table-height="tableHeight"
        :table-remote-method="tableRemoteMethod"
        :init-load="initLoad"
        :init-load-params="initLoadParams"
        @lsxm-confirm="lsxmConfirm"
        @sync-list-fun="syncListFun"
      />
      <template #footer>
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, useAttrs, watch } from 'vue'
import {
  lsxmMagnifierDialogEmits,
  lsxmMagnifierDialogProps,
} from './lsxm-magnifier-dialog'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'

defineOptions({
  name: 'ElLsxmMagnifierDialog',
})

const attrs = useAttrs()

const props = defineProps(lsxmMagnifierDialogProps)

const dialogVisible = ref(false)
const magnifierRef = ref()

watch(
  () => props.modelValue,
  (nv) => {
    dialogVisible.value = nv
  }
)

const emit = defineEmits(lsxmMagnifierDialogEmits)

function onCancel() {
  emit(UPDATE_MODEL_EVENT, false)
}

function onConfirm() {
  if (
    magnifierRef.value &&
    magnifierRef.value.triggerLsxmConfirm &&
    typeof magnifierRef.value.triggerLsxmConfirm === 'function'
  ) {
    magnifierRef.value.triggerLsxmConfirm()
  }
}

// init here
</script>
