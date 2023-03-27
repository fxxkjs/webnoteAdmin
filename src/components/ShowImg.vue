<template>
  <Teleport to="body">
    <div class="imgBox" @click="close" :class="[imgVisible ? '' : 'none']">
      <a-spin size="large" :spinning="spinning"> </a-spin>
      <div class="imginner">
        <img id="img" :src="imgurl" @load="imgOk" />
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import { ref, computed, onUpdated } from "vue";
import { getAdminImg } from "../http/http";


onUpdated(() => {
  if (imgurl.value === "" && imgVisible.value) {
    getAdminImg(props.imgkey, props.userKey).then((req) => {
      imgurl.value = req.data.data
    });
  }
});
const imgurl = ref("")
const emit = defineEmits();
const spinning = ref(true);
const props = defineProps({
  imgkey: {
    type: String,
    default: "",
  },
  userKey: {
    type: String,
    default: undefined,
  },
  visible: {
    type: Boolean,
    default: false,
  },
});
const imgVisible = computed({
  get() {
    return props.visible;
  },
  set(v) {
    emit("update:visible", v);

  },
});

function imgOk() {
  spinning.value = false;
}
function close() {
  imgVisible.value = false;
  imgurl.value = ""
}
</script>
<style scoped lang="less">
.imgBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.none {
  display: none;
}
</style>
