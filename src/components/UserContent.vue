<template>
  <a-table :dataSource="userList" :columns="userListColumns">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <span>
          <a @click="toDetail(record.userID, record.key)">详情</a>
        </span>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { getUserList } from "../http/http";
const router = useRouter();
onMounted(() => {
  getUserLists();
});

// 表格
let userList = ref([]);
let userListColumns = [
  {
    title: "注册时间",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "邮箱账号",
    dataIndex: "userID",
    key: "userID",
  },
  {
    title: "注册IP",
    dataIndex: "IP",
    key: "IP",
  },
  {
    title: "操作",
    key: "action",
  },
];
function getUserLists() {
  getUserList().then((req) => {
    userList.value = req.data.data;
  });
}

// 路由跳转
function toDetail(id, key) {
  router.push({
    name: "userDetail",
    params: { userID: id, userKey: key },
  });

}
</script>

<style scoped lang="less"></style>
