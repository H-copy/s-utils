# useSet
> 包装Set对象

### Example
```javascript
<template>
  <div class="home">

    <div>
      <Card style='margin: 20% auto; width: 600px' title='Name Tag'>
        
        <div slot="extra" style="display: flex; align-items: center">
          <Button @click='reset' > reset </Button>
        </div>

        <div style='margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #eee'>
          <Tag v-for='item of set' :key='item.name' closable @on-close="remove(item)" >  {{ item.name }} - {{ item.age }} </Tag>
        </div>

        <div> 
          <template  v-for='item of users'>
            <Button 
            style='margin-right: 8px' 
            icon="ios-add" 
            type="dashed" 
            size="small" 
            @click="add(item)" 
            v-if='!set.has(item)' 
            :key='item.name'> 
              {{ item.name }}
            </Button>
          </template>
        </div>

      </Card>
    </div>
    
  </div>
</template>

<script>
import { useSet } from 'vx-hook'

export default {
  setup(){
    const users = [
      
      {
        name: 'Coco',
        age: 24
      },
      {
        name: 'Jeck',
        age: 25
      },
      {
        name: 'Rogen'
      }

    ]

    const { set, add, remove } = useSet([ { name: 'copy', age: 34 } ])

    return {
      users,
      set,
      add,
      remove
    }

  }

}
</script>


```





### Params

##### initVal 初始值
```javascript

const initVal = [ { id: 1 }, { id: 2 } ]
const { ... } = useSet(initVal)
 
```


### Result

##### set Set对象


| 名称    | 说明                       |
| ------- | -------------------------- |
| set     | Set对象                    |
| util    | 工具集                     |
| add     | 添加子项                   |
| remove  | 移除子项                   |
| reset   | 重置                       |
| setInit | 修改初始值, 影响reset 的值 |
| update  | 修改初始值并执行重置       |

