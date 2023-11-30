<script setup lang="ts">
import {onMounted} from "vue";

onMounted(() => {
  const msg = window.ipcAPI.synchronous('Hello IPC')
  alert(msg)
  window.ipcAPI.handleMsg('async msg').then(msg => {
    alert(msg)
  })
})
</script>

<template>

</template>

<style scoped>

</style>