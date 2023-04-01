<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    @click="handleClick"
  >
    <a-menu-item key="/Home">用户数据</a-menu-item>
    <a-menu-item key="/Home/adminContent">匿名数据</a-menu-item>
    <a-menu-item key="/Home/adminData">主站管理</a-menu-item>
  </a-menu>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const selectedKeys = ref(["/Home"]);

const handleClick = (e) => {
  router.push({ path: e.key });
};

// router.beforeEach((to, from) => {
//   if (selectedKeys.value.length === 0) {
//     selectedKeys.value = [to.path];
//   }
// });
</script>
