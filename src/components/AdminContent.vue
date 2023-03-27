<template>
  <div id="userDetail">
    <a-table :dataSource="tableData.marks" :columns="tableData.marksColumns">
    </a-table>
  </div>
</template>

<script setup>
import { onMounted,ref } from "vue"
import { getUserLog } from "../http/http"
// 表格数据
let tableData = ref({
  marksColumns: [
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
  ],
  marks: [],
})

onMounted(() => {
  getLog()
})

function getLog() {
  getUserLog().then((req) => {
    tableData.value.marks = req.data.data
  })
}
</script>

<style lang="less"></style>
