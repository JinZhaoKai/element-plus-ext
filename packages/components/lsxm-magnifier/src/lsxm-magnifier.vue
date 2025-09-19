<template>
  <div class="el-lsxm-magnifier">
    <el-select
      v-model="magnifierValue"
      v-bind="$attrs"
      filterable
      remote
      reserve-keyword
      default-first-option
      :remote-method="lsxmRemoteMethod"
      :loading="selectLoading"
      :style="{ width: '100%' }"
    >
      <div class="el-lsxm-magnifier-dropdown__item">
        <el-row>
          <el-col
            v-for="tableColumn in tableColumnProp"
            :key="tableColumn.label"
            :span="Math.ceil(24 / tableColumnProp.length)"
          >
            {{ tableColumn.label }}
          </el-col>
        </el-row>
      </div>
      <el-option
        v-for="item in options"
        :key="item[lsxmValueKey]"
        :label="item[labelKey]"
        :value="item[lsxmValueKey]"
      >
        <el-row>
          <el-col
            v-for="tableColumn in tableColumnProp"
            :key="tableColumn.value"
            :span="Math.ceil(24 / tableColumnProp.length)"
          >
            {{ item[tableColumn.value] }}
          </el-col>
        </el-row>
      </el-option>
      <template #suffix>
        <el-icon
          class="el-lsxm-magnifier-search-icon"
          @click.stop="dialogVisible = true"
        >
          <Search />
        </el-icon>
      </template>
    </el-select>
    <el-lsxm-magnifier-dialog
      v-model="dialogVisible"
      :custom-page-component="customPageComponent"
      :search-param-prop="searchParamProp"
      :table-column-prop="tableColumnProp"
      :lsxm-value-key="lsxmValueKey"
      :enable-page="enablePage"
      :multiple="attrs.multiple"
      :table-height="tableHeight"
      :table-remote-method="tableRemoteMethod"
      :lsxm-confirm="handleLsxmConfirm"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, useAttrs, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { lsxmMagnifierEmits, lsxmMagnifierProps } from './lsxm-magnifier'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'

defineOptions({
  name: 'ElLsxmMagnifier',
})

const attrs = useAttrs()
const props = defineProps(lsxmMagnifierProps)

const magnifierValue: any = ref(props.modelValue)
const dialogVisible = ref(false)
const searchParams: any = ref({})
const options: any = ref([])
const total = ref(0)

const emit = defineEmits(lsxmMagnifierEmits)

watch(
  () => props.modelValue,
  () => {
    magnifierValue.value = props.modelValue
  }
)

watch(magnifierValue, () => {
  emit(UPDATE_MODEL_EVENT, magnifierValue.value)
  emit(CHANGE_EVENT, magnifierValue.value)
})

/**
 * 初始化查询参数
 */
function initSearchParams() {
  const obj: any = {}
  props.searchParamProp.forEach((item) => {
    obj[item.value] = null
  })
  searchParams.value = obj
}

function lsxmRemoteMethod(query: any) {
  const remoteMethod = attrs['remote-method']
  if (remoteMethod && typeof remoteMethod === 'function') {
    remoteMethod(query, (array: any, pageInfo: any) => {
      if (Array.isArray(array)) {
        options.value = array
        total.value = pageInfo.total
      } else {
        console.error(
          '[Element Error][Autocomplete]autocomplete suggestions must be an array'
        )
      }
    })
  }
}

function handleLsxmConfirm(tabSelVal: any) {
  if (tabSelVal) {
    let val: any
    if (Array.isArray(tabSelVal)) {
      val = tabSelVal.map((item) => item[props.lsxmValueKey])
    } else {
      val = tabSelVal[props.lsxmValueKey]
    }
    magnifierValue.value = val
    emit(UPDATE_MODEL_EVENT, val)
    emit(CHANGE_EVENT, val)
    dialogVisible.value = false

    if (attrs && attrs.select) {
      const { select } = attrs
      if (typeof select === 'function') {
        select(tabSelVal)
      }
    }
  }
}

initSearchParams()
lsxmRemoteMethod('')
// init here
</script>
