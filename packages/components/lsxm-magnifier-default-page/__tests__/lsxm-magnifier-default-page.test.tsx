import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import LsxmMagnifierDefaultPage from '../src/lsxm-magnifier-default-page.vue'

const AXIOM = 'Rem is the best girl'

describe('LsxmMagnifierDefaultPage.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => (
      <LsxmMagnifierDefaultPage>{AXIOM}</LsxmMagnifierDefaultPage>
    ))

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
