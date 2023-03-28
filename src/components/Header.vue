<script setup></script>

<template>
  <div id="header">
    <div id="logo"><img src="../assets/fontLogo.png" alt="webnote.logo" /></div>
    <!-- <div id="avatar">admin</div> -->
  </div>
</template>

<style scoped lang="less">
#header {
  display: flex;
  justify-content: space-between;

  & > {
    #logo {
      height: 20px;
    }
    // #avatar {
    //   // border: 1px solid #eee;
    // }
  }
}
</style>
