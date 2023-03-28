<script setup>
import Nav from "./components/Nav.vue";
</script>

<template>
  <a-layout>
    <a-layout-sider id="nav">
      <Nav />
    </a-layout-sider>
    <a-layout-content id="content">
      <RouterView class="wh100"></RouterView>
    </a-layout-content>
  </a-layout>
</template>

<style scoped lang="less">
#content {
  padding: 10px 10px;
}
</style>
