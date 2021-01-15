# 异步函数返回包装
通过简单的Promise包装，将异步函数与异步错误同时返回。免去使用try cache 的错误捕捉方式。

## 使用
```javascript

asynce function(){
  const [res, err] = await asyncFormat(factch('http://test.com'))

  if(err){
    console.error(`Error: ${err}`)
    return
  }

  console.log(`Success: ${res}`)
  
}

```
## Parmas

- promise 接收一个promise对象