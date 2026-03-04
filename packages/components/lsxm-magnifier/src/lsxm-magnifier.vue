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
      @focus="handleFocus"
      @change="handleChange"
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
      <template #label="{ label, value }">
        <slot
          name="custom-label"
          :label="label"
          :value="value"
          :row="getRow(value)"
        >
          {{ label }}
        </slot>
      </template>
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
      :dialog-title="dialogTitle"
      :dialog-width="dialogWidth"
      :custom-page-component="customPageComponent"
      :search-param-prop="searchParamProp"
      :table-column-prop="tableColumnProp"
      :lsxm-value-key="lsxmValueKey"
      :enable-page="enablePage"
      :multiple="attrs.multiple"
      :table-height="tableHeight"
      :table-remote-method="tableRemoteMethod"
      :lsxm-confirm="handleLsxmConfirm"
      :sync-list-fun="handleSyncListFun"
      :init-load="initLoad"
      :init-load-params="initLoadParams"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, useAttrs, watch } from 'vue'
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
const initOptions: any = ref([])
const basicOptions: any = ref([])
const enableInitParams = ref(true)

const row = computed(() => {
  const multiple = attrs.multiple
  if (multiple === '' || Boolean(multiple)) {
    return options.value.filter((item: any) => {
      return magnifierValue.value.some((selItem: any) => {
        const valueKey: any = attrs['value-key']
        if (valueKey) {
          return item[props.lsxmValueKey][valueKey] === selItem[valueKey]
        } else {
          return item[props.lsxmValueKey] === selItem
        }
      })
    })
  }
  return getRow(magnifierValue.value)
})

const options = computed({
  get() {
    return basicOptions.value
      .concat(initOptions.value)
      .reduce((acc: any, item: any) => {
        const res = acc.some((obj: any) => {
          const valueKey: any = attrs['value-key']
          if (valueKey) {
            return (
              obj[props.lsxmValueKey][valueKey] ===
              item[props.lsxmValueKey][valueKey]
            )
          } else {
            return obj[props.lsxmValueKey] === item[props.lsxmValueKey]
          }
        })
        if (!res) {
          acc.push(item)
        }
        return acc
      }, [])
  },
  set(val) {
    if (enableInitParams.value) {
      initOptions.value = val
    } else {
      basicOptions.value = val
    }
  },
})

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

watch(
  () => props.initLoad,
  (nv) => {
    if (nv) {
      lsxmRemoteMethod('')
    }
  },
  {
    immediate: true,
  }
)

function lsxmRemoteMethod(query: any) {
  const remoteMethod = attrs['remote-method']
  if (remoteMethod && typeof remoteMethod === 'function') {
    remoteMethod(
      query,
      (array: any) => {
        if (Array.isArray(array)) {
          options.value = array
        } else {
          console.error(
            '[Element Error][Autocomplete]autocomplete suggestions must be an array'
          )
        }
      },
      {
        initLoadParams: enableInitParams.value ? props.initLoadParams : {},
      }
    )
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
    handleChange()
    dialogVisible.value = false

    if (attrs && attrs.select) {
      const { select } = attrs
      if (typeof select === 'function') {
        select(tabSelVal)
      }
    }
  }
}

function getRow(value: any) {
  const index = options.value.findIndex((item: any) => {
    const valueKey: any = attrs['value-key']
    if (valueKey) {
      return item[props.lsxmValueKey][valueKey] === value[valueKey]
    } else {
      return item[props.lsxmValueKey] === value
    }
  })
  return index > -1 ? options.value[index] : null
}

function handleSyncListFun(array: any) {
  if (Array.isArray(array) && array.length > 0) {
    basicOptions.value = array
  }
}

function handleFocus() {
  enableInitParams.value = false
}

function handleChange() {
  const value = row.value
  if (value) {
    initOptions.value = Array.isArray(value) ? value : [value]
  }
}

// init here
</script>
