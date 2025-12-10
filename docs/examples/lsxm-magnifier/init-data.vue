<template>
  <el-lsxm-magnifier
    v-model="value"
    lsxm-value-key="id"
    label-key="name"
    multiple
    :search-param-prop="magnifierOptions.searchParamProp"
    :table-column-prop="magnifierOptions.tableColumnProp"
    :select-loading="magnifierOptions.loading"
    :init-load="magnifierOptions.initLoad"
    :init-load-params="magnifierOptions.initLoadParams"
    table-height="400px"
    placeholder="请输入"
    :remote-method="handleQuerySearchAsync"
    :table-remote-method="handleQueryTableSearchAsync"
  >
    <template #custom-label="{ label, row }">
      <span style="color: red">{{
        row ? row.code + '~' + row.name : label
      }}</span>
    </template>
  </el-lsxm-magnifier>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(['Wyoming'])
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
  initLoad: false,
  initLoadParams: {},
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
      name: `${item}-1`,
    }
  })
}

function handleQuerySearchAsync(val, cb, { initLoadParams }) {
  handleQueryTableSearchAsync(
    {
      start: 0,
      limit: 20,
      name: val,
      ...initLoadParams,
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

/**
 * 模拟详情页加载远程数据
 */
function handleGetView() {
  setTimeout(() => {
    // 假设这是详情接口返回的值生成的对象
    magnifierOptions.value.initLoadParams = {
      name: 'Wyoming',
    }
    // 设置放大镜开始加载
    magnifierOptions.value.initLoad = true
  }, 1000)
}

load()
handleGetView()
</script>
