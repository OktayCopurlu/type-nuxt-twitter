<template>
  <Twitter />
</template>

<script lang='ts'>
import protectedRouter from "~/auth";
import { defineComponent } from "@nuxtjs/composition-api";
import { initAuth } from "~/store/user";

export default defineComponent({
  setup() {
    initAuth();
    protectedRouter();
  },
});
</script>