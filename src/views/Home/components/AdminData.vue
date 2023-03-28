<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="图片">
      <a-table
        :dataSource="imglist"
        :columns="imglistColumns"
        :loading="loading"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'show'">
            <span>
              <a @click="showImage(record.key)">查看图片</a>
            </span>
          </template>
        </template>
      </a-table>
      <ShowImg v-model:visible="imageVisible" :imgkey="imgKey" />
    </a-tab-pane>
    <a-tab-pane key="2" tab="文档" class="wh100">
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
          :externalLink="external_link"
          defaultOpen="preview"
        ></mavon-editor>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
// mavon-editor
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import ShowImg from "../../../components/ShowImg.vue";
import { getAdminNav, getMdData, getUserImgList } from "../../../http/http";
const { upQx } = inject("qx");
onMounted(() => {
  getAdminNav().then((req) => {
    if (req.data.code === 1) {
      treeData.value = req.data.data;
    } else {
      upQx();
    }
  });
  getUserImgList().then((req) => {
    if (req.data.code === 1) {
      imglist.value = req.data.data;
      loading.value = false;
    } else {
      upQx();
    }
  });
});
// mavonEditor
let mdText = ref(`### Welcome to webNote`);
let treeData = ref([]);
let external_link = {
  markdown_css: function () {
    return "https://cdn.webnote.fun/mavonEditor/github-markdown.min.css";
  },
  hljs_js: function () {
    return "https://cdn.webnote.fun/mavonEditor/highlight.min.js";
  },
  hljs_lang: function (lang) {
    return "https://cdn.webnote.fun/mavonEditor/languages/" + lang + ".min.js";
  },
  hljs_css: function (css) {
    if (css) {
      return "https://cdn.webnote.fun/mavonEditor/styles/" + css + ".min.css";
    }
  },
  katex_js: function () {
    return "https://cdn.webnote.fun/mavonEditor/katex.min.js";
  },
  katex_css: function () {
    return "https://cdn.webnote.fun/mavonEditor/katex.min.css";
  },
};
// mavonEditor Nav
function select(item, e) {
  let rootNode = e?.parent?.nodes[0]?.title || false;
  let sonNode = e?.parent?.nodes[1]?.title || false;
  let node = e?.title || false;
  if (rootNode && sonNode && node) {
    getMdData(`${rootNode}/${sonNode}/${node}`).then((req) => {
      if (req.data.code === 1) {
        mdText.value = req.data.data;
      } else {
        upQx();
      }
    });
  }
}

// tabKey
let activeKey = ref("1");

// 表格数据
const loading = ref(true);
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
