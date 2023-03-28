<template>
  <a-table
    :dataSource="userList"
    :columns="userListColumns"
    :loading="tabLoading"
  >
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
import { onMounted, ref, inject } from "vue";
import { getUserList } from "../../../http/http";
const router = useRouter();
const { upQx } = inject("qx");
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
const tabLoading = ref(true);
function getUserLists() {
  getUserList().then((req) => {
    if (req.data.code === 1) {
      userList.value = req.data.data;
      tabLoading.value = false;
    } else {
      upQx();
    }
  });
}

// 路由跳转
function toDetail(id, key) {
  router.push({
    path: "/Home/userDetail",
    query: { userID: id, userKey: key },
  });
}
</script>

<style scoped lang="less"></style>
