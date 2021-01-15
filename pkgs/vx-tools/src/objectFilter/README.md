# 对象值过滤器
使用指定的属性字段，抽取对应的字段值，组成新的对象并返回。

## 使用
```javascript

const A = {
  name: 'A',
  age: 12,
  sex: 'man',
  job: null 
}

const B =  objectFilter(['sex', 'age'])
// B = { sex: 'man', age: 12 }

```

## Params
- keys 需要抽取的属性字段
- target 被抽取对象


## tips
该函数只做浅遍历，所以如果取值为对象，将保留引用关系。