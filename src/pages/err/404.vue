<template>
  <div>
    <div class="container">
      <div class="img"></div>
      <div class="content">
        <h1>404</h1>
        <div class="text">抱歉,你访问页面的页面不存在或正在开发中</div>
        <el-button type="primary" @click="goHome">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  props: {},
  methods: {
    goHome() {
      this.$router.push("/");
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  .img {
    width: 430px;
    height: 360px;
    background: url("../../assets/images/404.png");
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
    animation: fadeInLeft 0.6s linear;
    margin-right: 60px;
  }
  .content {
    animation: fadeInRight 0.6s linear;
    h1 {
      margin-bottom: 10px;
      font-size: 40px;
    }
    .text {
      color: rgba(0, 0, 0, 0.45);
      margin-bottom: 20px;
    }
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
</style>