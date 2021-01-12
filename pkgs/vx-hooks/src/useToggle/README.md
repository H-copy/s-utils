# useToggle
> 切换器



### Example

```javascript
<template>
  <div class="home">

    <div>
     <h1>
        {{ state }} 
     </h1>
     <button @click='onOpen'>
        open
    </button>
    <button @click='onClose'>
        close
    </button>
    </div>
    
  </div>
</template>

<script>
import { useToggle } from 'vx-hook'

export default { 
  setup(){

    const { state, setLeft, setRight } = useToggle('open', 'close')
	
    return {
    	state,
        onOpen: setLeft,
        onclose: setRight
    }
  }
}
</script>

```





### Params

| 名称         | 说明                         |
| ------------ | ---------------------------- |
| defaultValue | 默认值                       |                         
| reverseValue | 切换值                       |                   



### Result

| 名称              | 说明       |
| ----------------- | ---------- |
| state             | 当前值     |
| toggle            | 设置值     |
| setLeft           | 设置默认值 |
| setRigth          | 设置却换值 |





