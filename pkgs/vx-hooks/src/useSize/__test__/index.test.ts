// import { mount } from '@vue/test-utils'
// import { onMounted, ref } from 'vue'
// import { useSize } from '../index'
// import { dely } from '../../_utils'

describe('useSize', () => {

  test('init', async () => {
    // const cmp = {
    //   template: `
    //     <div id='box' ref='element' style='width: 10px; height: 10px;'>
    //     </div>
    //   `,
    //   setup(){
    //     const style = ref({
    //       width: '10px',
    //       height: '10px'
    //     })
    //     const { state, element } = useSize()

    //     onMounted(() => {
    //       console.log('render >>>', 
    //       element.value,
    //       element.value?.style?.width,
    //     )
    //     })
    //     return {
    //       state,
    //       element,
    //       style
    //     }
    //   }
    // }
    // const warp = mount(cmp, { attachTo: document.body })
    // const box = warp.find('#box')
    // await box.trigger('click')
    // await dely(1)
    // expect(warp.vm.element).not.toBeUndefined()
    // expect(warp.vm.state.width).toBe(10)
    // expect(warp.vm.state.height).toBe(10)
    
  })

  // test('set element', () => {
  //   const cmp = {
  //     template: `
  //       <div ref='outEle' :style='style'></div>
  //     `,
  //     setup(){
  //       const style = ref({
  //         width: '10px',
  //         height: '10px'
  //       })
  //       const outEle = ref<HTMLElement>()
  //       const { state } = useSize(outEle)
        
  //       return {
  //         state,
  //         outEle,
  //         style
  //       }
  //     }
  //   }
    
  //   const warp = mount(cmp, { attachTo: document.body })
  //   expect(warp.vm.outEle).not.toBeUndefined()
  //   expect(warp.vm.state).toStrictEqual({ width: 10, height: 10 })
  // })

  
})