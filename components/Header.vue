<script setup lang="ts">
import GreaterThanIcon from "~/components/icons/GreaterThanIcon";
import LessThanIcon from "~/components/icons/LessThanIcon";

defineProps<{
  level: string;
  wpm: number;
}>();

defineEmits(["update:level", "update:wpm"]);

const levels = ["random", "beginner", "intermediate", "advanced", "expert"];

const IconButton = h("button", {
  class:
    "hover:bg-gray-200 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center",
});
</script>

<template>
  <div class="fixed top-0 w-screen flex justify-center pt-4 text-lg">
    <header class="bg-slate-100 py-2 px-6 rounded-lg flex gap-4 items-center">
      <div class="flex items-center gap-2">
        <p class="text-sm">Level</p>
        <select
          class="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
          @change="$emit('update:level', $event.target.value)"
        >
          <option
            :value="_level"
            v-for="_level in levels"
            :key="_level"
            :selected="_level === level"
          >
            {{ _level }}
          </option>
        </select>
      </div>

      <div class="flex items-center">
        <p class="text-sm" title="Word Per Minute">WPM</p>
        <IconButton @click="$emit('update:wpm', wpm - 1)">
          <LessThanIcon />
        </IconButton>
        <span>{{ wpm }}</span>
        <IconButton @click="$emit('update:wpm', wpm + 1)">
          <GreaterThanIcon />
        </IconButton>
      </div>
    </header>
  </div>
</template>
