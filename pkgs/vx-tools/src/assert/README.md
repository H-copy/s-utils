# 类型判断相关函数

## objectType 
获取对象类型字符描述

### 使用
```javascript

const typeStr = objectType('name')
// typeStr = 'string' 

```

### Params
- data 类型判断对象

## isType
类型判断, objectType 的二次封装函数

### 使用
```javascript

const isString = str => isType(str, 'string')
isString('cc') // true
```

### Parmas
- data 被判断对象
- typeStr 类型描述

