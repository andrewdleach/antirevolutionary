import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'

describe('Landing page', () => {
  it('renders without errors', async () => {
    const wrapper = await mountSuspended(IndexPage)
    expect(wrapper.exists()).toBe(true)
  })
})
