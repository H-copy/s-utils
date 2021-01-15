# url查询参数拼接
将浅层的对象数据拼接到url地址的查询参数中。

## 使用
```javascript

const parmas = {
  id: 1,
  name: 'Co'
}

const url = joinUrlParams('/users', params)
// url = /users?id=1&name=Co

```

## Parmas
- url 被拼接url地址
- obj 被拼接参数对象


## tips
不支持复杂的数据结构，例如对象嵌套。