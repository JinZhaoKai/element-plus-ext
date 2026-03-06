<template>
  <el-lsxm-magnifier
    v-model="value"
    lsxm-value-key="id"
    label-key="name"
    multiple
    :search-param-prop="magnifierOptions.searchParamProp"
    :table-column-prop="magnifierOptions.tableColumnProp"
    :select-loading="magnifierOptions.loading"
    table-height="400px"
    placeholder="请输入"
    :remote-method="handleQuerySearchAsync"
    :table-remote-method="handleQueryTableSearchAsync"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(['Alabama'])
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

function handleQuerySearchAsync(val, cb) {
  handleQueryTableSearchAsync(
    {
      start: 0,
      limit: 20,
      name: val,
    },
    cb
  )
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

load()
</script>
