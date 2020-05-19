<template>
  <div id="app">
    <back-top>
      <router-view></router-view>
    </back-top>
  </div>
</template>
<script>
import BackTop from "./components/BackTop";
export default {
  data() {
    return {};
  },

  components: {
    BackTop
  },

  props: {},

  methods: {},

  mounted() {},

  watch: {},

  computed: {}
};
</script>
<style  lang='scss'>
@import "./styles/common";
@import "./styles/reset";
</style>