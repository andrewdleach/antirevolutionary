import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SouthSoundPage from '~/pages/united-states/wa/regions/south-sound.vue'

describe('South Sound map page', () => {
  it('renders without errors', async () => {
    const wrapper = await mountSuspended(SouthSoundPage)
    expect(wrapper.exists()).toBe(true)
  })

  it('has the map container element', async () => {
    const wrapper = await mountSuspended(SouthSoundPage)
    expect(wrapper.find('#map').exists()).toBe(true)
  })

  it('has a back link to /united-states', async () => {
    const wrapper = await mountSuspended(SouthSoundPage)
    const backLink = wrapper.find('a[href="/united-states"]')
    expect(backLink.exists()).toBe(true)
  })

  it('has the page header', async () => {
    const wrapper = await mountSuspended(SouthSoundPage)
    expect(wrapper.find('#header').exists()).toBe(true)
  })
})
