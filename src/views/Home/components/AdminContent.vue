<template>
  <div id="userDetail">
    <a-table :dataSource="marks" :columns="marksColumns" :loading="loading">
    </a-table>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { getUserLog } from "../../../http/http";
const { upQx } = inject("qx");
// 表格数据
const loading = ref(true);
const marks = ref([]);
let marksColumns = [
  {
    title: "访问时间",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "访问IP",
    dataIndex: "IP",
    key: "IP",
  },
  {
    title: "访问内容",
    dataIndex: "title",
    key: "title",
  },
];
onMounted(() => {
  getLog();
});

function getLog() {
  getUserLog().then((req) => {
    if (req.data.code === 1) {
      marks.value = req.data.data;
      loading.value = false;
    } else {
      upQx();
    }
  });
}
</script>

<style lang="less"></style>
