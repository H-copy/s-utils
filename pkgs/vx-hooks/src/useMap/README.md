# useMap
> 包装Map类型



### Example

```javascript
<template>
  <div class="home">
    <div>
        <input v-model='newName' />
        <button @click='add'>
            add
    	</button>
     	<ul>
        	<li v-for='name of names' :key='name' @click='remove(name)' > 
                {{ name }} 	
    		</li>    
    	</ul>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useMap } from 'vx-hook'

export default {
  setup(){
    const newName = ref('')
    const { map, get, set, remove } = useMap([
      [ 'Rogen', 1 ],  
      [ 'Coco', 2 ],
      [ 'Jim', 3 ]
    ])
    const names = computed(() => [ ...map.keys() ])
    const add = () => set(newName, names.value.length)
      
    return {
      newName,
		  names,
      remove
    }
  }
}
</script>

```



### Params

| 名称 | 说明       |
| ---- | ---------- |
| fn   | 被处理函数 | 
| wait | 间隔时间   |      



### Result

| 名称   | 说明     |
| ------ | -------- |
| run    | 执行函数 |
| cancel | 取消执行 |



