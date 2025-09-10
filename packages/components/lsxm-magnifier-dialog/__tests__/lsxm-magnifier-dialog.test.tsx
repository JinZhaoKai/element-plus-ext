import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import LsxmMagnifierDialog from '../src/lsxm-magnifier-dialog.vue'

const AXIOM = 'Rem is the best girl'

describe('LsxmMagnifierDialog.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => (
      <LsxmMagnifierDialog>{AXIOM}</LsxmMagnifierDialog>
    ))

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
