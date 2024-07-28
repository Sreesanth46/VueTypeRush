<script setup lang="ts">
import Char from "./Char.vue";
defineProps<{
  actualWord: string;
  typedWord?: string;
}>();
</script>

<template>
  <template v-for="(letter, letterIndex) in actualWord" :key="letter">
    <Char :actual="letter" :typed="typedWord?.[letterIndex]" />
    <span v-if="letterIndex == actualWord.length - 1">&nbsp;</span>
  </template>
</template>
