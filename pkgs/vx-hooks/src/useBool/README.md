# useBool

> 布尔值管理hook



### Uesage

```vue
<template>
		
	<h1 v-if='state'>
        visibal
    </h1>

	<button @click='toggle'>
        toggle
    </button>
	
</template>

import { useBool } from 'vx-hook'

export default {
	
	setup(){
		const { state, toggle } = useBool(true)
		
		return { state, toggle }
	}

}


```


### Params

| 名称       | 说明     | 默认值 |
| ---------- | -------- | ------ |
| initStatus | 初始状态 | false  |



### API

| 名称     | 说明            |             
| -------- | --------------- |
| status   | 当前状态        |
| setTrue  | 状态设置为true  |
| setFalse | 状态设置为false |
| toggle   | 状态切换        |


