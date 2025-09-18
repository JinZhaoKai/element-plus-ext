<template>
  <div class="el-lsxm-magnifier-default-page">
    <el-form v-if="searchParamProp && searchParamProp.length > 0" inline>
      <el-form-item
        v-for="item in searchParamProp"
        :key="item.value"
        :label="item.label"
      >
        <el-input
          v-model="(searchParams as any)[item.value]"
          @blur="startSearch"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="startSearch"> 查询 </el-button>
        <el-button @click="clearSearchParams">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="lsxm-el-table-content">
      <el-table
        ref="searchTableRef"
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        :height="tableHeight"
        highlight-current-row
        @selection-change="tableSelectionChange"
        @row-click="tableRowClick"
        @row-dblclick="tableRowDbClick"
      >
        <el-table-column v-if="multiple" type="selection" width="55" />
        <el-table-column
          v-for="item in tableColumnProp"
          :key="item.value"
          :prop="item.value"
          :label="item.label"
          :width="item.width ? item.width : 'auto'"
          show-overflow-tooltip
        />
      </el-table>
    </div>
    <div v-if="enablePage" class="lsxm-el-pagination-content">
      <el-pagination
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.totalCount"
        @current-change="handleCurrentPageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  lsxmMagnifierDefaultPageEmits,
  lsxmMagnifierDefaultPageProps,
} from './lsxm-magnifier-default-page'

defineOptions({
  name: 'ElLsxmMagnifierDefaultPage',
})

const props = defineProps(lsxmMagnifierDefaultPageProps)

const searchTableRef = ref()
const searchParams: any = ref({})
const tableData: any = ref([])
const loading = ref(false)
// 已选行
const selectedRow = ref(null)
// 已选行集合
const selectedRowList = ref([])
// 分页参数
const pagination = ref({
  pageSize: 10,
  currentPage: 1,
  totalCount: 0,
})

const emit = defineEmits(lsxmMagnifierDefaultPageEmits)

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

function tableSelectionChange(selection: any) {
  selectedRowList.value = selection
}

function tableRowClick(row: never) {
  if (props.multiple) {
    const index = selectedRowList.value.indexOf(row)
    if (index > -1) {
      selectedRowList.value.splice(index, 1)
      searchTableRef.value.toggleRowSelection(row, false)
    } else {
      selectedRowList.value.push(row)
      searchTableRef.value.toggleRowSelection(row, true)
    }
  } else {
    if (selectedRow.value && selectedRow.value === row) {
      selectedRow.value = null
      searchTableRef.value.setCurrentRow()
    } else {
      selectedRow.value = row
      searchTableRef.value.setCurrentRow(row)
    }
  }
}

function tableRowDbClick(row: never) {
  if (!props.multiple) {
    selectedRow.value = null
    searchTableRef.value.setCurrentRow()
    tableRowClick(row)
    triggerLsxmConfirm()
  }
}

function loadTableData() {
  let params
  if (props.enablePage) {
    params = {
      start: pagination.value.pageSize * (pagination.value.currentPage - 1),
      limit: pagination.value.pageSize,
      ...searchParams.value,
    }
  } else {
    params = searchParams.value
  }
  if (props.tableRemoteMethod) {
    loading.value = true
    props.tableRemoteMethod(params, (list: any, pageInfo: any) => {
      if (props.enablePage) {
        if (pageInfo) {
          if (Number.isInteger(pageInfo)) {
            pagination.value.totalCount = pageInfo
          } else {
            if (pageInfo.total && Number.isInteger(pageInfo.total)) {
              pagination.value.totalCount = pageInfo.total
            }
          }
        }
      }
      tableData.value = list
      loading.value = false
    })
  }
}

function startSearch() {
  pagination.value.currentPage = 1
  loadTableData()
}

function clearSearchParams() {
  searchParams.value = {}
}

function handleCurrentPageChange(pageNo: any) {
  pagination.value.currentPage = pageNo
  loadTableData()
}

function handleSizeChange(pageSize: any) {
  pagination.value.pageSize = pageSize
  loadTableData()
}

function triggerLsxmConfirm() {
  emit(
    'lsxm-confirm',
    props.multiple ? selectedRowList.value : selectedRow.value
  )
}

defineExpose({
  triggerLsxmConfirm,
})

initSearchParams()
loadTableData()
// init here
</script>
