import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import LsxmMagnifier from '../src/lsxm-magnifier.vue'

const AXIOM = 'Rem is the best girl'

describe('LsxmMagnifier.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <LsxmMagnifier>{AXIOM}</LsxmMagnifier>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
