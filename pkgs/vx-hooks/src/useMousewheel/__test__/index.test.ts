import {
  useMousewheel
} from '../index'

describe("useMousewheel", () =>{

  test("", () => {

    const {
      onMousewheel,
      directionY
    } = useMousewheel()

    onMousewheel({
      deltaY: 100,
      deltaMode: 0
    } as any)

    expect(directionY.value).toBe('down')
    
  })
  
})