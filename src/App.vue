<script setup>
// import { RouterLink, RouterView } from "vue-router";

import Nav from "./components/Nav.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <div class="container">
    <div>
      <a-layout id="main">
        <a-layout-header id="header">
          <Header />
        </a-layout-header>
        <a-layout>
          <a-layout-sider id="nav">
            <Nav />
          </a-layout-sider>
          <a-layout-content id="content">
            <RouterView class="wh100"></RouterView>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;

  background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);
  background-blend-mode: multiply;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    width: calc(100% - 80px);
    height: calc(100% - 80px);
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.ant-layout,
.ant-layout-header,
.ant-layout-sider {
  background: rgba(255, 255, 255, 0.8);
}

#header {
  border-bottom: 1px solid #eee;
  padding: 0 20px;
}
#main {
  padding: 15px;
  height: 100%;
  min-height: 840px;
  min-width: 1000px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 8px 15px 4px #ececec;
}
#nav {
  border-right: 1px solid #eee;
}
#content {
  padding: 10px 10px;
}
</style>
