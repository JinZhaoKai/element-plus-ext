<template>
  <el-lsxm-magnifier
    v-model="value"
    lsxm-value-key="obj"
    label-key="name"
    value-key="id"
    :search-param-prop="magnifierOptions.searchParamProp"
    :table-column-prop="magnifierOptions.tableColumnProp"
    :select-loading="magnifierOptions.loading"
    table-height="400px"
    placeholder="请输入"
    :remote-method="handleQuerySearchAsync"
    :table-remote-method="handleQueryTableSearchAsync"
    :custom-label-method="handleCustomLabelMethod"
  >
    <template #custom-label="{ label, row }">
      <span style="font-weight: bold">{{
        row ? row.code + '~' + row.name + '~' + row.obj.id : label
      }}</span>
    </template>
  </el-lsxm-magnifier>
</template>

<script setup>
import { ref } from 'vue'

const value = ref({ id: 1, label: 'Alabama' })
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
    {
      label: '对象',
      value: 'obj',
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
  let index = 0
  list.value = states.value.map((item) => {
    index += 1
    return {
      id: item,
      code: `${item}`,
      name: `${item}`,
      obj: { id: index, label: item },
    }
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

function handleCustomLabelMethod({ label, value }, row) {
  console.log(label, value, row)
  return label
}

load()
</script>
