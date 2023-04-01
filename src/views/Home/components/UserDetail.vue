<template>
  <div id="userDetail">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="浏览记录">
        <a-table
          :dataSource="tableData.marks"
          :columns="tableData.marksColumns"
          :loading="tableData.marksLod"
        >
        </a-table>
      </a-tab-pane>

      <a-tab-pane key="2" tab="登录记录">
        <a-table
          :dataSource="tableData.logon"
          :columns="tableData.logonColumns"
          :loading="tableData.logonLod"
        >
        </a-table>
      </a-tab-pane>

      <a-tab-pane key="3" tab="图片">
        <a-table
          :dataSource="tableData.imglist"
          :columns="tableData.imglistColumns"
          :loading="tableData.imglistLod"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'show'">
              <span>
                <a @click="showImage(record.key)">查看图片</a>
              </span>
            </template>
          </template></a-table
        >
      </a-tab-pane>

      <template #leftExtra>
        <a-button type="text" class="tabs-extra-demo-button">{{
          userName
        }}</a-button>
      </template>

      <template #rightExtra>
        <a-button class="tabs-extra-demo-button" @click="back">返回</a-button>
      </template>
    </a-tabs>

    <ShowImg
      v-model:visible="imageVisible"
      :imgkey="imgkey"
      :userKey="userKey"
    />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, inject } from "vue";
import ShowImg from "../../../components/ShowImg.vue";
import {
  getUserLog,
  getUserSignInLog,
  getUserImgList,
} from "../../../http/http";
const { upQx } = inject("qx");
const route = useRoute();
const router = useRouter();
let userName = route.query.userID;
let userKey = route.query.userKey;
// 获取默认数据
onMounted(() => {
  getLog(userKey);
  getSignInLog(userKey);
  getImgList(userKey);
});
// Tabs
const activeKey = ref("1");
function back() {
  router.push({
    path: "/Home",
  });
}

// 表格数据
let tableData = ref({
  marks: [],
  logon: [],
  imglist: [],
  marksLod: true,
  logonLod: true,
  imglistLod: true,
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
  logonColumns: [
    {
      title: "登录时间",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "登录IP",
      dataIndex: "IP",
      key: "IP",
    },
    {
      title: "登录状态",
      dataIndex: "title",
      key: "title",
    },
  ],
  imglistColumns: [
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
  ],
});

// 查看图片
const imgkey = ref("");
const imageVisible = ref(false);
const showImage = (key) => {
  imgkey.value = key;
  imageVisible.value = true;
};

// 浏览记录
function getLog(userKey) {
  getUserLog(userKey).then((req) => {
    if (req.data.code === 1) {
      tableData.value.marks = req.data.data;
      tableData.value.marksLod = false;
    } else {
      upQx();
    }
  });
}

// 登录记录
function getSignInLog(userKey) {
  getUserSignInLog(userKey).then((req) => {
    if (req.data.code === 1) {
      tableData.value.logon = req.data.data;
      tableData.value.logonLod = false;
    } else {
      upQx();
    }
  });
}

// 图片列表
function getImgList(userKey) {
  getUserImgList(userKey).then((req) => {
    if (req.data.code === 1) {
      tableData.value.imglist = req.data.data;
      tableData.value.imglistLod = false;
    } else {
      upQx();
    }
  });
}
</script>

<style lang="less">
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }

  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }

  .ant-modal-body {
    flex: 1;
  }
}

// width="100%"
//       wrap-class-name="full-modal"

.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;

  .close {
    cursor: pointer;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 26px;
    position: absolute;
    right: 20px;
    top: 20px;
    color: white;
    border: 2px solid white;
    border-radius: 50%;
  }

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  img {
    max-width: 700px;
    max-height: 500px;
    opacity: 0;
    transition: all 0.15s ease-in-out;

    &.loaded {
      opacity: 1;
    }
  }
}
</style>
