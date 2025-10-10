<template>
  <el-lsxm-table
    :draggable="true"
    :data="tableData"
    :columns="myArray"
    :all-columns="allColumns"
    style="width: 100%; margin-top: 20px"
  >
    <el-table-column
      v-for="item in myArray"
      :key="item.prop"
      :prop="item.prop"
      :column-key="item.prop"
      :label="item.label"
      :width="item.width"
    />
  </el-lsxm-table>
</template>

<script setup>
import { ref } from 'vue'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const myArray = ref([
  {
    label: '日期',
    prop: 'date',
    width: '200',
  },
  {
    label: '名称',
    prop: 'name',
    width: '200',
  },
  {
    label: '地址',
    prop: 'address',
    width: '',
  },
])

const allColumns = ref([
  {
    label: '日期',
    prop: 'date',
    width: '200',
  },
  {
    label: '名称',
    prop: 'name',
    width: '200',
  },
  {
    label: '地址',
    prop: 'address',
    width: '',
  },
])
</script>
