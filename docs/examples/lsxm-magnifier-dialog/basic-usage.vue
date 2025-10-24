<template>
  <el-button type="text" @click="dialogVisible = true"
    >点击打开 Lsxm Magnifier Dialog</el-button
  >

  <el-lsxm-magnifier-dialog
    v-model="dialogVisible"
    :search-param-prop="magnifierOptions.searchParamProp"
    :table-column-prop="magnifierOptions.tableColumnProp"
    :table-remote-method="handleQueryTableSearchAsync"
    :lsxm-confirm="handleLsxmConfirm"
  />
</template>

<script setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
const magnifierOptions = ref({
  searchParamProp: [
    {
      label: '代码',
      value: 'code',
    },
    {
      label: '名称',
      value: 'name',
    },
  ],
  tableColumnProp: [
    {
      label: '代码',
      value: 'code',
    },
    {
      label: '名称',
      value: 'name',
    },
  ],
  loading: false,
})
const list = ref([])
const states = ref([
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
])

function load() {
  list.value = states.value.map((item) => {
    return { id: item, code: `code:${item}`, name: `name:${item}` }
  })
}

function handleQueryTableSearchAsync(searchParams, cb) {
  if (searchParams.name && searchParams.name !== '') {
    magnifierOptions.value.loading = true
    setTimeout(() => {
      magnifierOptions.value.loading = false
      const arr = list.value.filter((item) =>
        item.name.toLowerCase().includes(searchParams.name.toLowerCase())
      )
      cb(
        arr.slice(searchParams.start, searchParams.limit + searchParams.start),
        arr.length
      )
    }, 1000)
  } else {
    magnifierOptions.value.loading = true
    setTimeout(() => {
      magnifierOptions.value.loading = false
      cb(
        list.value.slice(
          searchParams.start,
          searchParams.limit + searchParams.start
        ),
        states.value.length
      )
    }, 1000)
  }
}

function handleLsxmConfirm(val) {
  console.log(val)
  dialogVisible.value = false
}

load()
</script>
