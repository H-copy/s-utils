# 计时器
> 循环调用回调函数

## Useage
```javascript
import { ref, onUnmounted } from 'vue'
import { useTimeout, useTimeLoop } from '@micro/hook'

export default {
  setup(){
    const { run, stop, isRun } = useTimeout(callback, 2)
    const count = ref(0)
    function  callback() {
      if(count.value >= 10){
        stop()
      }
    }

    onUnmounted(() => {
      isRun.value && stop()
    })    

    run()
  }
}

```

## Params

| 名称 | 说明 |
| -----| ---- |
| callback | 回调 |
| t | 间隔时间（s）|


## API
| 名称 | 说明 |
| run | 开启计时器 |
| stop | 终止计时器 |
| isRun | 是否运行中 |
| setCallback | 设置回调函数 |
