import { mount } from '@vue/test-utils'
import { useClickAway } from '../index'
import { ref } from 'vue'
 

const defaultSetp = () => {
  const count = ref(0)
  const onClickAway = () => {
    count.value += 1
  }
  const { target, addEvent, cancelEvent, reset } = useClickAway(onClickAway)

  return {
    target,
    count,
    addEvent, cancelEvent, reset
  }
}

const defaultTemplate = `
  <div>
    {{ count }}
    <div id='left' ref='target'></div>
    <div id='right'></div>
  </div>
`

const buildCmp = (setup = defaultSetp, template = defaultTemplate) => {
  const cmp = {
    template,
    setup,
  }
  return mount<ReturnType<typeof setup>>(cmp, { attachTo: document.body }) 
}

describe('useClickAway', () => {

  test('default target', async () => {

    const warp = buildCmp()
    
    const left = warp.find('#left')
    const right = warp.find('#right')
    
    await left.trigger('click')
    expect(warp.vm.count).toBe(0)
    await right.trigger('click')
    expect(warp.vm.count).toBe(1)
    await right.trigger('click')
    expect(warp.vm.count).toBe(2)
  })

  test('one target param', async() => {
    const warp = buildCmp()
    
    const left = warp.find('#left')
    const right = warp.find('#right')
    
    await left.trigger('click')
    expect(warp.vm.count).toBe(0)
    await right.trigger('click')
    expect(warp.vm.count).toBe(1)
    await right.trigger('click')
    expect(warp.vm.count).toBe(2)
  })

  test('target list param', async () => {
    const template = `
      <div>
        {{ count }}
        <div id='left' :ref='el => target[0] = el'></div>
        <div id='center' :ref='el => target[1] = el'></div>
        <div id='right'></div>
      </div>
    `
    const setup = () => {
      const count = ref(0)
      const onClickAway = () => {
        count.value += 1
      }
      const target = ref([])
      const { addEvent, cancelEvent, reset } = useClickAway(onClickAway, target)
    
      return {
        target,
        count,
        addEvent, cancelEvent, reset
      }
    }

    const warp = buildCmp(setup, template)

    const left = warp.find('#left')
    const center = warp.find('#center')
    const right = warp.find('#right')
    
    await left.trigger('click')
    expect(warp.vm.count).toBe(0)
    await center.trigger('click')
    expect(warp.vm.count).toBe(0)
    await right.trigger('click')
    expect(warp.vm.count).toBe(1)
    
  })

  test('cancelEvent, addEvent, reset', async() => {
    const warp = buildCmp()
    
    const left = warp.find('#left')
    const right = warp.find('#right')

    
    await left.trigger('click')
    expect(warp.vm.count).toBe(0)
    await right.trigger('click')
    expect(warp.vm.count).toBe(1)
    warp.vm.cancelEvent()
    
    await right.trigger('click')
    expect(warp.vm.count).toBe(1)

    warp.vm.addEvent()
    await right.trigger('click')
    expect(warp.vm.count).toBe(2)

    const fn = jest.fn()
    warp.vm.reset(fn, 'click')
    await right.trigger('click')
    expect(warp.vm.count).toBe(2)
    expect(fn.mock.calls.length).toBe(1)
    
  })
})