# vx-hooks (ts 重构中)
umi hooks 等工具包的 `typescript` + `vue3.0` 实现

## 安装
```shell
  npm i vx-hooks

  // or
  yarn add vx-hooks
```

## 使用
``` typescript

<template>
  <img v-if='visibal' :src='https://avatars.githubusercontent.com/u/27235325?s=460&u=f722ec56565c6d644cd8c37be8dadf2a79022c51&v=4'>
  <button @click='show'> show </button>
  <button @click='hidden'> hidden </button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useBool } from 'vx-hooks'
export default defineComponent({
  setup(){
    const { state:visibal, setTrue:show, setFalse:hidden } = useBool
    return {
      visibal,
      show,
      hidden
    }
  }
})
</script>

```

## 本地API文档
``` shell

npm run doc

// of

yarn doc

```

## [API 文档](https://h-copy.github.io/s-utils/modules/vx_hooks.html)