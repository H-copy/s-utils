# useMousewheel
> 鼠标滚轮事件


## Useage

```vue
<template>
  <input 
  v-model='value' 
  @foucs='canUse'
  @blur='unUse'
  @mousewheel='onMousewheel' />
</template>
<script>

export default {
  setup(){
    const {
      isUp,
      isDown,
      directionY,
      wheelEvent,
      unUse,
      canUse,
      onMousewheel,
    }
    const count = ref(0)
    
    watch(wheelEvent, () => {

      if(isUp(directionY.value)){
        count.value -= 1
      }

      if(isDown(directionY.value)){
        count.value += 1
      }
      
    })
    
    return {
      onMousewheel,
      unUse,
      canUse,
    }
    
  }
}

</script>
```

### API

| 名称     | 说明            |             
| -------- | --------------- |
| status   | 当前状态        |
| setTrue  | 状态设置为true  |
| setFalse | 状态设置为false |
| toggle   | 状态切换        |


