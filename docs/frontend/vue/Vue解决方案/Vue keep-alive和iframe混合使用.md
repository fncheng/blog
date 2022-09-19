## Keep-alive和iframe混合使用

```vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/iframe">Iframe</router-link> |
    </div>
    <i-frame v-if="$route.meta.iframe" :src="$route.meta.url" />
    <router-view v-else></router-view>
    <!-- <iframe
      v-if="$route.meta.iframe"
      src="http://192.168.0.183:8080/hiip-portal/a/sso/showSysIndex"
      frameborder="0"
      width="100%"
      height="100%"
    ></iframe> -->
  </div>
</template>
```



Iframe-view.vue

```vue
<template>
  <iframe width="100%" height="100%" :src="src" frameborder="0"></iframe>
</template>

<script>
export default {
  name: 'iframe-view',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
}
</script>
```



注意⚠️：必须通过meta属性来获取iframe的url，不能通过path来获取，否则页面无法显示