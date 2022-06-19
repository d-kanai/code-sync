<template>
  <footer class="footer">
    <div class="substack-link">
      <span class="icon"><i class="fa fa-link"></i></span>
      <a href="https://dkanai.substack.com/" target="_blank">Watch Live Coding Video with Coding Mind Sync</a>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Footer",
  props: {},
});
</script>

<style lang="scss">
.footer {
  text-align: center;
  font-size: 23px;
  position: fixed;
  width: 100%;
  color: white;
  bottom: 0;
  background: rgb(78, 78, 78);
  height: 50px;
  padding: 0px;
  a:link { color: white; }
  a:visited { color: white; }
  a:hover { color: rgb(190, 190, 255); }
  .substack-link {
    padding: 10px;
    .icon {
      margin-right: 10px;
    }
  }
}
</style>
