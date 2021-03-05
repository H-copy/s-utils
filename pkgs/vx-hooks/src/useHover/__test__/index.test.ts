import { mount } from '@vue/test-utils'
import { useHover } from '../index'
import { ref } from 'vue'

describe('useHover', () => {

  test('init', () => {
    const cmp = {
      template: `
        <div id='area' ref='target'> {{ hoverStatus }} </div>
      `,
      setup() {
        
        const { target, hoverStatus} = useHover()

        return {
          target,
          hoverStatus,
        }
      }
    }

    const warp = mount(cmp, { attachTo: document.body })
    expect(warp.vm.hoverStatus).toBeFalsy()
    expect(warp.vm.target).not.toBeUndefined()
  })

  test('init set target', () => {
    const cmp = {
      template: `
        <div id='area' ref='target'> {{ hoverStatus }} </div>
      `,
      setup() {
        const target = ref()
        const { hoverStatus } = useHover({target})

        return {
          target,
          hoverStatus,
        }
      }
    }
    
    const warp = mount(cmp, { attachTo: document.body })
    expect(warp.vm.hoverStatus).toBeFalsy()
    expect(warp.vm.target).not.toBeUndefined()
  })

  test('hover leave', async () => {
    const cmp = {
      template: `
        <div id='area' ref='target'> {{ hoverStatus }} </div>
      `,
      setup() {
        const count = ref(0)
        const onEnter = () => {
          count.value += 1
        }

        const onLeave = () => {
          count.value -= 1
        }

        const { target, hoverStatus} = useHover({ onEnter, onLeave })
        return {
          count,
          target,
          hoverStatus,
        }
      }
    }

    const warp = mount(cmp, {
      attachTo: document.body
    })
    const area = warp.find('#area')

    await area.trigger('mouseleave')

    await area.trigger('mouseenter')
    expect(warp.vm.hoverStatus).toBeTruthy()
    expect(warp.vm.count).toBe(1)
    
    await area.trigger('mouseleave')
    expect(warp.vm.hoverStatus).toBeFalsy()
    expect(warp.vm.count).toBe(0)
    
  })

  test('hover leave', async () => {
    const cmp = {
      template: `
        <div id='area' ref='target'> {{ hoverStatus }} </div>
      `,
      setup() {
        const count = ref(0)
        const onEnter = () => {
          count.value += 1
        }

        const onLeave = () => {
          count.value -= 1
        }

        const { target, hoverStatus, addEvent, cancelEvent} = useHover({ onEnter, onLeave })
        return {
          count,
          target,
          hoverStatus,
          addEvent,
          cancelEvent
        }
      }
    }

    const warp = mount(cmp, {
      attachTo: document.body
    })
    const area = warp.find('#area')

    await area.trigger('mouseleave')

    await area.trigger('mouseenter')
    expect(warp.vm.hoverStatus).toBeTruthy()
    expect(warp.vm.count).toBe(1)
    
    await area.trigger('mouseleave')
    expect(warp.vm.hoverStatus).toBeFalsy()
    expect(warp.vm.count).toBe(0)

    warp.vm.cancelEvent()

    await area.trigger('mouseenter')
    expect(warp.vm.hoverStatus).toBeFalsy()
    expect(warp.vm.count).toBe(0)

    warp.vm.addEvent()

    await area.trigger('mouseenter')
    expect(warp.vm.hoverStatus).toBeTruthy()
    expect(warp.vm.count).toBe(1)
    
    await area.trigger('mouseleave')
    expect(warp.vm.hoverStatus).toBeFalsy()
    expect(warp.vm.count).toBe(0)
  })
  
})