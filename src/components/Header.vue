<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <p class="title">Coding Mind Sync</p>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Header",
  props: {},
});
</script>

<style lang="scss">
.navbar {
  color: white;
  background: rgb(56, 56, 56);
}
.title {
  color: white;
  margin: 20px;
  font-size: 30px;
}
</style>
