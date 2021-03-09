import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { useMutationObserver } from '../index'

describe('useMutationObserver', () => {

  test('init', async () => {
    const cmp = {
      template : `
        <div id='box' :style='style' ref='element' @click='change'>
        </div>
      `,
      props: ['handler'],
      setup(props: any){
        const style = ref({
          width: '100px',
          height: '100px'
        })

        const change = () =>{
          style.value = {
            width: '200px',
            height: '200px'
          }
        }

        const { element, observer, watchStop } = useMutationObserver({
          handler: props.handler
        })

        return{
          style,
          change,
          element, 
          observer,
          watchStop
        }
      }
    }
    
    const handler = jest.fn()
    const warp = mount(cmp, { attachTo: document.body, propsData: {handler} })
    const box = warp.find('#box')
    await box.trigger('click')
    expect(warp.vm.element).not.toBeUndefined()
    expect(warp.vm.observer).not.toBeUndefined()
    expect(handler.mock.calls.length).toBe(1)
  })

  test('self element', async () => {
    const cmp = {
      template : `
        <div id='box' :style='style' ref='element' @click='change'>
        </div>
      `,
      props: ['handler'],
      setup(props: any){
        const style = ref({
          width: '100px',
          height: '100px'
        })

        const change = () =>{
          style.value = {
            width: '200px',
            height: '200px'
          }
        }

        const element = ref()
        const { observer, watchStop } = useMutationObserver({
          target: element,
          handler: props.handler
        })

        return{
          style,
          change,
          element, 
          observer,
          watchStop
        }
      }
    }
    
    const handler = jest.fn()
    const warp = mount(cmp, { attachTo: document.body, propsData: {handler} })
    const box = warp.find('#box')
    await box.trigger('click')
    expect(warp.vm.element).not.toBeUndefined()
    expect(warp.vm.observer).not.toBeUndefined()
    expect(handler.mock.calls.length).toBe(1)
  })

  test('options', async () => {
    const cmp = {
      template : `
        <div>
          <div id='box' :class='className' :style='style' ref='element' @click='changeStyle'>
          </div>
          <div id='sub' @click='changeClass'></div>
        </div>
      `,
      props: ['handler'],
      setup(props: any){
        const style = ref({
          width: '100px',
          height: '100px'
        })
        const className = ref('')
        const changeClass = () => {
          className.value = 'new-name'
        }
        
        const changeStyle = () =>{
          style.value = {
            width: '200px',
            height: '200px'
          }
        }

        const { element, observer, watchStop } = useMutationObserver({
          handler: props.handler,
          options: { attributeFilter: [ 'class' ] }
        })

        return{
          style,
          changeStyle,
          changeClass,
          className,
          element, 
          observer,
          watchStop
        }
      }
    }
    
    const handler = jest.fn()
    const warp = mount(cmp, { attachTo: document.body, propsData: {handler} })
    const box = warp.find('#box')
    await box.trigger('click')
    expect(handler.mock.calls.length).toBe(0)

    const sub = warp.find('#sub')
    await sub.trigger('click')
    expect(handler.mock.calls.length).toBe(1)
    
  })

  test('watchStop', async () => {
    const cmp = {
      template : `
        <div>
          <div v-if='visibal' id='box' :style='style' ref='element' @click='change'>
          </div>
          <button @click='show'></button>
        </div>
      `,
      props: ['handler'],
      setup(props: any){
        const style = ref({
          width: '100px',
          height: '100px'
        })

        const change = () =>{
          style.value = {
            width: '200px',
            height: '200px'
          }
        }

        const { element, observer, watchStop } = useMutationObserver({
          handler: props.handler
        })

        const visibal = ref(false)
        const show = () => visibal.value = true 

        return{
          style,
          change,
          element, 
          observer,
          watchStop,
          visibal,
          show
        }
      }
    }
    
    const handler = jest.fn()
    const warp = mount(cmp, { attachTo: document.body, propsData: {handler} })
    warp.vm.watchStop()
    const btn = warp.find('button')
    await btn.trigger('click')
    
    const box = warp.find('#box')
    await box.trigger('click')
    expect(warp.vm.observer).toBeUndefined()
    expect(handler.mock.calls.length).toBe(0)

  })
  
})