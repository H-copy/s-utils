// import { mount } from '@vue/test-utils'
// import { ref } from 'vue'
// import { useSize } from '../index'

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
    //     return {
    //       state,
    //       element,
    //       style
    //     }
    //   }
    // }
    // const warp = await mount(cmp, { attachTo: document.body })
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