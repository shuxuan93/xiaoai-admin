<template>
  <div class="wraperss">
    <template>
      <el-backtop target=".wraperss"></el-backtop>
    </template>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.wraperss {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
}
</style>
