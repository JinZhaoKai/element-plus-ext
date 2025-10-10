<template>
  <div class="el-lsxm-table">
    <el-table
      ref="draggableTableRef"
      :class="draggable ? 'draggable' : ''"
      v-bind="$attrs"
      @header-dragend="defaultColumnWidthChange"
    >
      <slot />
    </el-table>

    <el-popover width="150" trigger="click">
      <div class="el-lsxm-table__checkbox">
        <el-scrollbar
          v-if="allColumns && allColumns.length > 0"
          :style="'height: ' + popoverHeight"
          class="checkbox-scrollbar"
        >
          <el-checkbox-group v-model="selColumnProps">
            <el-checkbox
              v-for="item in allColumns"
              :key="item.prop"
              :value="item.prop"
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-scrollbar>
        <div v-else class="checkbox-empty">暂无可选的动态列</div>
      </div>
      <template #reference>
        <div v-if="draggable && settingBtn" :class="settingPositionClass">
          <el-icon>
            <Setting />
          </el-icon>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { lsxmTableProps } from './lsxm-table'
import Sortable from 'sortablejs'

defineOptions({
  name: 'ElLsxmTable',
})

defineExpose({ getSourceTableRef })

const draggableTableRef = ref()

const props = defineProps(lsxmTableProps)

const settingPositionClass = computed(() => {
  return `el-lsxm-table__content is-fixed ${props.settingPosition}`
})

const selColumnProps = computed({
  get() {
    return props.columns.map((item) => item.prop)
  },
  set(columnProps) {
    // eslint-disable-next-line vue/no-mutating-props
    props.columns.splice(0, props.columns.length)
    columnProps.forEach((columnProp) => {
      const index = props.allColumns.findIndex(
        (allColumn) => columnProp === allColumn.prop
      )
      if (index > -1) {
        // eslint-disable-next-line vue/no-mutating-props
        props.columns.push(props.allColumns[index])
      }
    })
    defaultColumnsChange(props.columns)
  },
})

/**
 * 初始化拖动功能
 */
function initSortable() {
  // 需要支持拖动效果的列表容器，在这里我们设置为el-table组件的tbody，
  // 注意：最前面的一段为前面el-table的class: draggable-table，主要为了防止如果页面有多个table，多个table同时实现拖拽效果
  // 当然，如果多个table都需要拖拽效果，选择器中最前面的.draggable-table可以去除。
  const tr = document.querySelector(
    '.el-lsxm-table .draggable .el-table__header-wrapper thead tr'
  )
  Sortable.create(tr, {
    animation: 150,
    // 哪些元素不能拖动
    filter: props.filterDraggableSelector,
    // 哪些元素可以拖动
    draggable: '.el-table__cell',
    // 需要在odEnd方法中处理原始eltable数据，使原始数据与显示数据保持顺序一致
    onEnd: sortableOnEnd,
    onMove: sortableOnMove,
  })
}

/**
 * 拖动结束
 * @param e
 */
function sortableOnEnd(e) {
  // 得到当前表格列移动的索引。
  // 这是表格列的索引，不一定是动态表格的索引，因为表格选择列、序号列不在动态表格中，如果直接使用表格索引，索引会不一致。
  const { newIndex, oldIndex } = e
  // 通过虚拟dom获取表格列数
  const tableColumns = getSourceTableRef().columns
  // 当用户拖动到会改变顺序时才触发
  if (newIndex !== oldIndex) {
    // 获取表格列的属性名称
    const newProp = tableColumns[newIndex].property
    const oldProp = tableColumns[oldIndex].property
    if (!newProp || !oldProp) {
      throw new Error(
        '使用表格拖动功能的列必须配置prop属性, 并且需要保持表格列中的prop属性唯一'
      )
    }
    // 根据属性名称获取属性的索引，这才是动态列表的索引
    const newPropIndex = props.columns.findIndex(
      (column) => column.prop === newProp
    )
    const oldPropIndex = props.columns.findIndex(
      (column) => column.prop === oldProp
    )
    // 通过动态列表的索引驱动列表改变顺序
    // eslint-disable-next-line vue/no-mutating-props
    const targetRow = props.columns.splice(oldPropIndex, 1)[0]
    // eslint-disable-next-line vue/no-mutating-props
    props.columns.splice(newPropIndex, 0, targetRow)
    nextTick(() => {
      // 表格列顺序发生变化，触发变更
      defaultColumnsChange(props.columns)
    })
  }
}

/**
 * 在列表中或列表之间移动项目时的事件
 * @param evt
 * @returns {boolean|number} false：取消停靠；-1：在目标前插入；1：在目标后插入。
 */
function sortableOnMove(evt) {
  // 不允许停靠在标签黑名单中
  if (Sortable.utils.is(evt.related, props.filterDraggableSelector)) {
    return false
  }
  // false：取消停靠；-1：在目标前插入；1：在目标后插入。
  return evt.willInsertAfter ? 1 : -1
}

/**
 * 表格列变化默认实现
 *
 * @param columns
 */
function defaultColumnsChange(columns) {
  // 如果传递了函数，那么使用用户自定义的函数
  if (typeof props.handleColumnsChange === 'function') {
    props.handleColumnsChange(columns)
  }
}

/**
 * 表格列宽变化默认实现
 * @param newWidth 新宽度
 * @param oldWidth 旧宽度
 * @param column 列
 * @param event event
 */
function defaultColumnWidthChange(newWidth, oldWidth, column, event) {
  // 如果传递了函数，那么使用用户自定义的函数
  if (typeof props.headerColumnWidthChange === 'function') {
    props.headerColumnWidthChange(newWidth, oldWidth, column, event)
  } else {
    // 否则使用默认的实现
    const columnKey = column.columnKey
    if (columnKey) {
      const index = props.columns.findIndex((item) => item.prop === columnKey)
      // eslint-disable-next-line vue/no-mutating-props
      props.columns[index].width = String(newWidth)
      // 表格列宽度发生变化，触发变更
      defaultColumnsChange(props.columns)
    } else {
      console.error('请设置column-key属性,并保持唯一')
    }
  }
}

function getSourceTableRef() {
  return draggableTableRef.value
}

onMounted(() => {
  nextTick(() => {
    initSortable()
  })
})
// init here
</script>
