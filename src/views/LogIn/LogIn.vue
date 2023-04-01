<template>
  <div id="bg">
    <div id="login">
      <a-form
        id="from"
        class="form"
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
      >
        <a-form-item
          name="username"
          :required="true"
          :rules="[
            {
              required: true,
              message: '请检查邮箱格式',
              pattern: mailReg,
            },
          ]"
        >
          <a-input
            v-model:value="formState.username"
            placeholder="请输入邮箱"
          />
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[
            { required: true, message: '请输入6-16位密码', min: 6, max: 16 },
          ]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="请输入6-16位密码"
          />
        </a-form-item>

        <a-form-item
          name="code"
          :rules="[
            { required: true, message: '请输入6位验证码', pattern: /^\d{6}$/ },
          ]"
          class="components-input-demo-presuffix"
        >
          <a-input
            v-model:value="formState.code"
            placeholder="请输入6位邮箱验证码"
          >
            <template #suffix>
              <a-tooltip title="发送邮件验证码" v-if="mailShow && !mailLoadimg">
                <mail-two-tone @click="mailCode" />
              </a-tooltip>
              <sync-outlined spin v-if="mailShow && mailLoadimg" />
              <a-tooltip title="验证码10分钟有效" v-if="!mailShow">
                <check-outlined />
              </a-tooltip>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">登录 | 注册</a-button>
        </a-form-item>
      </a-form>
    </div>
    <img id="bgimg" src="https://cdn.webnote.fun/img/bg.jpg" @load="xxx" />
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useRouter } from "vue-router";
// icon
import {
  SyncOutlined,
  CheckOutlined,
  MailTwoTone,
} from "@ant-design/icons-vue";
import { register, getCode, getCookieType, setSession } from "@/http/http.js";
import { message } from "ant-design-vue";
const router = useRouter();
const { upQx } = inject("qx");
onMounted(() => {
  setSession();
  getCookieType().then((req) => {
    if (req.data.code === 1) {
      router.push({
        path: "/Home",
      });
      upQx(true);
    }
  });
});
// from
let formState = ref({
  username: "",
  password: "",
  code: "",
  remember: true,
});
function onFinish(values) {
  register(values.username, values.password, values.code).then((req) => {
    if (req.data.code === 1) {
      router.push({
        path: "/Home",
      });
      upQx(true);
    } else {
      message.warning(req.data.msg, 5);
    }
  });
}

// Code
const mailShow = ref(true);
const mailLoadimg = ref(false);
const mailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
function mailCode() {
  if (mailReg.test(formState.value.username)) {
    mailLoadimg.value = true;
    getCode(formState.value.username).then((req) => {
      if (req.data.code === 1) {
        mailShow.value = false;
        mailLoadimg.value = false;
      } else {
        mailLoadimg.value = false;
        console.log(req.data.msg);
      }
    });
  } else {
    message.warning("邮箱格式错误", 5);
  }
}
function xxx(x) {
  x.target.style.zIndex = 0;
}
</script>

<style lang="less" scoped>
#bg {
  width: 100%;
  height: 100%;
  background-image: url("https://cdn.webnote.fun/img/bg-mini.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;

  #from {
    z-index: 2;
  }
  #login {
    width: 100%;
    height: 70%;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    & > form {
      border: 1px solid #7dbcea;
      border-radius: 6%;
      padding: 30px 30px 0 30px;
    }
  }
}

#bgimg {
  position: absolute;
  top: 0;

  max-width: 100%;
  min-width: 100%;
  max-height: 100%;
  min-height: 100%;
  object-fit: cover;
  z-index: -1;
  // transition: all 5s;
}
</style>
