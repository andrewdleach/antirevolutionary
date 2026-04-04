import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'

describe('Landing page', () => {
  it('renders without errors', async () => {
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.exists()).toBe(true)
  })

  it('has a link to /united-states with battlefield text', async () => {
    const wrapper = await mountSuspended(IndexPage)
    const link = wrapper.find('a[href="/united-states"]')
    expect(link.exists()).toBe(true)
    expect(link.text()).toContain('Battlefield')
  })
})
