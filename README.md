# shoppingmall52

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

```js
  //页面刚开始会直接跳到APP.vue使用重定向rediect(意思就是通过各种方式将网络请求重新定个方向转到其他位置 如：网页重定向、域名的重定向、路由选择的变化也是对数据报文经由路径的一种重定向)
  {
      path: '/',
      name: 'home',
      redirect:{name: 'Login'}
    }
```