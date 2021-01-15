# 本地缓存包装函数

## 使用
```javascript
import { registSaveFn } from '@micro/utils'
//全局调用一次
registSaveFn() 
 
const saveKey = 'USER'
localStorage.$setItem(saveKey, { name: 'copy', sex: 'man' })
const user = localStorage.$getItem(saveKey)
console.log(user.name)
```


## API

#### registSaveFn
向 localStorage，sessionStorage 原型注入自定义`$setItem` `$getItem` 方法,
全局调用一次, 具有幂等性。

#### buildSetItem
构建对应缓存对象的`$setItem`方法
```javascript

const setItem = buildSetItem(localStorage)
setItem('key', { id: 1 })
console.log(localStorage.getItem('key'))
// { id: 1 }

```

#### buildGetItem
构建对应缓存对象的`$getItem`方法
```javascript

localStorage.getItem('key', JSON.stringify({ id: 1 }))
const getItem = buildGetItem(localStorage)
const data = getItem('key')
console.log(data, typeof(data))
// { id: 1 }  object

```