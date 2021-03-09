import { mount } from '@vue/test-utils'
import { useMouse } from '../index'

describe('useMouse', () =>{

  test('init', async () => {
    const cmp = {
      template: `
        <div></div>
      `,
      setup(){
        const { state } = useMouse()
        return { state }
      }
    }

    const warp = mount(cmp, { attachTo: document.body })
    expect(warp.vm.state).toStrictEqual({
      screenX: undefined,
      screenY: undefined,
      clientX: undefined,
      clientY: undefined,
      pageX: undefined,
      pageY: undefined,
    })
  })

  test('mouse move', async () => {
    const cmp = {
      template: `
        <div></div>
      `,
      setup(){
        const { state } = useMouse()
        return { state }
      }
    }

    const warp = mount(cmp, { attachTo: document.body })
    await warp.trigger('mousemove', {clientX: 10, clientY: 10})
    expect(warp.vm.state).toStrictEqual({
      screenX: 0,
      screenY: 0,
      clientX: 10,
      clientY: 10,
      pageX: undefined,
      pageY: undefined,
    })
  })

  test('bind & remove', async () => {
    const cmp = {
      template: `
        <div></div>
      `,
      setup(){
        return useMouse()
      }
    }

    const warp = mount(cmp, { attachTo: document.body })
    
    warp.vm.cancelEvent()
    await warp.trigger('mousemove', {clientX: 10, clientY: 10})

    expect(warp.vm.state).toStrictEqual({
      screenX: undefined,
      screenY: undefined,
      clientX: undefined,
      clientY: undefined,
      pageX: undefined,
      pageY: undefined,
    })

    warp.vm.addEvent()
    await warp.trigger('mousemove', {clientX: 10, clientY: 10})
    expect(warp.vm.state).toStrictEqual({
      screenX: 0,
      screenY: 0,
      clientX: 10,
      clientY: 10,
      pageX: undefined,
      pageY: undefined,
    })
  })
  
})