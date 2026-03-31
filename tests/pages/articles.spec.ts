import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ArticlePage from '~/pages/articles/[...slug].vue'

describe('Article page', () => {
  it('renders without errors', async () => {
    const wrapper = await mountSuspended(ArticlePage)
    expect(wrapper.exists()).toBe(true)
  })
})
