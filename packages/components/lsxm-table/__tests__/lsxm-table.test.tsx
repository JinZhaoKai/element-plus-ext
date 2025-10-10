import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import LsxmTable from '../src/lsxm-table.vue'

const AXIOM = 'Rem is the best girl'

describe('LsxmTable.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <LsxmTable>{AXIOM}</LsxmTable>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
