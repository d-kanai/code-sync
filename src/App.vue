<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: { Header, Footer },
});
</script>

<style lang="scss"></style>
