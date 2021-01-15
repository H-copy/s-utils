# delay 延时器
通过Promise为异步函数中添加延时函数，达到延时执行的目的

## 使用
delay 将返回Promise包装函数 
```javascript

// 模式一
// 利用 async 等待delay执行完成, 此时delay将向任务队列中插叙空函数 
async function load(){
  // 延时获取数据
  
  await delay(2)
  const data = await API.getData(...)
  ...
}

// 模式二
// 直接将回调函数作物，delay的延时执行函数
delay(3, () => API.getData(...)).then(data => console.log('data: ', data))

```

## Parmas
- time 延时时间（s）
- callback? 延时执行函数
 
