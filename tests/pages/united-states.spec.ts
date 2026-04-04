import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import UnitedStatesPage from '~/pages/united-states/index.vue'

describe('US map page', () => {
  it('renders without errors', async () => {
    const wrapper = await mountSuspended(UnitedStatesPage)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders an SVG with state paths', async () => {
    const wrapper = await mountSuspended(UnitedStatesPage)
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.findAll('path').length).toBeGreaterThan(40)
  })

  it('has a link back to home', async () => {
    const wrapper = await mountSuspended(UnitedStatesPage)
    const backLink = wrapper.find('a[href="/"]')
    expect(backLink.exists()).toBe(true)
  })

  it('WA state path has active class', async () => {
    const wrapper = await mountSuspended(UnitedStatesPage)
    const waPath = wrapper.find('[data-state-id="wa"]')
    expect(waPath.exists()).toBe(true)
    expect(waPath.classes()).toContain('state--active')
  })
})
