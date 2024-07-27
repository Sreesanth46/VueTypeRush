<script setup lang="ts">
import { computed, toRef } from "vue";
const props = defineProps<{
  actual: string;
  typed?: string;
}>();

const typed = toRef(props, "typed");

const textColor = computed(() => {
  if (!typed.value) return "text-blue-500";
  if (props.actual.localeCompare(typed.value) === 0) return "text-green-500";
  return "text-red-500";
});
</script>
<template>
  <span :class="textColor">
    {{ actual }}
  </span>
</template>
