<script setup lang="ts">
import {ref} from "vue";

const copyRef = ref<HTMLTextAreaElement>()
const txtRef = ref<HTMLTextAreaElement>()


async function copyText() {
  await window.clipboardApi.writeText((copyRef.value as HTMLTextAreaElement).value)
}

async function pasteTxt() {
  (txtRef.value as HTMLTextAreaElement).value = await window.clipboardApi.readText()
}
</script>

<template>
  <button @click="copyText">copy</button>
  <button @click="pasteTxt">paste</button>
  <textarea ref="copyRef">
    electron-vite
  </textarea>
  <textarea ref="txtRef"/>
</template>

<style scoped>

</style>