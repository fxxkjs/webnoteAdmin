<script setup>
import Header from "./components/Header.vue";
import { provide, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const qx = ref(false);
function upQx(b = false) {
  qx.value = b;
}
provide("qx", { qx, upQx });
router.beforeEach((to, from) => {
  if (to.path !== "/" && qx.value === false) {
    router.push({
      path: "/",
    });
  }
});
</script>

<template>
  <div class="container">
    <div>
      <a-layout id="main">
        <a-layout-header id="header">
          <Header />
        </a-layout-header>
        <a-layout>
          <RouterView></RouterView>
        </a-layout>
      </a-layout>
    </div>
    <a id="ICP" href="https://beian.miit.gov.cn/">豫ICP备20014783号-1</a>
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

#header {
  // border-bottom: 1px solid #eee;
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
#ICP {
  position: fixed;
  left: 10px;
  bottom: 10px;
  color: #507ea2;
}
</style>
