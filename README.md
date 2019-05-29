# @saber2pr/request

[![npm](https://img.shields.io/npm/v/@saber2pr/request.svg?color=blue)](https://www.npmjs.com/package/@saber2pr/request)

> 提供全局拦截器配置

`[size]: [7.22kb]`

# 为什么？

已经有 axios...

qwq

axios 在使用 rollup 打包时会发生错误，无法处理 http 依赖(别和我说 webpack :(

```bash
npm install @saber2pr/request
```

# API

```ts
new Request(baseConfig)
```

## 常用请求

1. new Request().get(url, config)

2. new Request().post(url, config)

3. new Request().put(url, config)

4. new Request().delete(url, config)

## 自定义请求

new Request().fetch

## 拦截器

1. new Request().interceptors
2. new Request().interceptors.request
3. new Request().interceptors.request.use
4. new Request().interceptors.requestInterceptors
5. new Request().interceptors.response
6. new Request().interceptors.response.use
7. new Request().interceptors.responseInterceptors

### 还需要说么。。

使用 typescript 编码，不需要文档！qwq

```ts
npm start

npm run dev

npm run serve
```

# Author

> saber2pr
