<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="文档" class="wh100">
      <div id="mdBox" class="wh100">
        <a-directory-tree
          style="width: 256px"
          multiple
          :tree-data="treeData"
          @click="select"
        ></a-directory-tree>
        <mavon-editor
          id="md"
          v-model="mdText"
          :toolbarsFlag="false"
          :subfield="false"
          defaultOpen="preview"
        ></mavon-editor>
      </div>
    </a-tab-pane>

    <a-tab-pane key="2" tab="图片">
      <a-table :dataSource="imglist" :columns="imglistColumns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'show'">
            <span>
              <a @click="showImage(record.key)">查看图片</a>
            </span>
          </template>
        </template>
      </a-table>
      <ShowImg v-model:visible="imageVisible" :imgkey="imgKey"/>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup>
import { ref, onMounted } from "vue";
// mavon-editor
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import ShowImg from "./Showimg.vue";
import { getAdminNav, getMdData, getUserImgList } from "../http/http";
onMounted(() => {
  getAdminNav().then((req) => {
    treeData.value = req.data.data;
  });
  getUserImgList().then((req) => {
    imglist.value = req.data.data;
  });
});
// mavonEditor
let mdText = ref(`### Welcome to webNote`);
let treeData = ref([]);
// mavonEditor Nav
function select(item, e) {
  let rootNode = e?.parent?.nodes[0]?.title || false;
  let sonNode = e?.parent?.nodes[1]?.title || false;
  let node = e?.title || false;
  if (rootNode && sonNode && node) {
    getMdData(`${rootNode}/${sonNode}/${node}`).then((req) => {
      console.log(req);
      mdText.value = req.data.data;
    });
  }
}

// tabKey
let activeKey = ref("1");

// 表格数据
let imglist = ref([]);
let imglistColumns = [
  {
    title: "图片名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "图片大小",
    dataIndex: "size",
    key: "size",
  },
  {
    title: "操作",
    dataIndex: "show",
    key: "show",
  },
];

// 查看图片
const imgKey = ref("");
const imageVisible = ref(false);
const showImage = (key) => {
  imgKey.value = key;
  imageVisible.value = true;
};
</script>
<style lang="less">
#mdBox {
  display: flex;
  justify-content: flex-start;
}
.ant-tabs-content-top {
  width: 100%;
  height: 100%;
}
#md {
  flex-grow: 1;
}
</style>
