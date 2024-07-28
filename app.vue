<script setup lang="ts">
import { ref, computed } from "vue";
const sentence =
  "React's influence on front-end development is undeniable, offering a streamlined, efficient approach to user interface creation.";
const typed = ref("");
const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);
const mistakes = ref(0);

onStartTyping(() => {
  focusInput();
});

const focusInput = () => {
  // if already focused skip
  if (isFocused.value) return;

  if (inputRef.value) {
    inputRef.value.focus();
    isFocused.value = true;
  }
};

const blurInput = () => {
  if (!isFocused.value) return;

  if (inputRef.value) {
    inputRef.value.blur();
    isFocused.value = false;
  }
};

const handleInput = (event: Event) => {
  const { value } = event.target as HTMLInputElement;
  typed.value = value;
};

const actualCharacters = computed(() => {
  return sentence.split("");
});

const typedCharacters = computed(() => {
  return typed.value.split("");
});
</script>

<template>
  <div
    class="h-screen whitespace-normal text-2xl md:text-3xl leading-10 md:leading-relaxed sm:flex sm:items-center"
  >
    <ArtDot />
    <div class="container mx-auto p-6">
      <nav class="flex gap-4 mb-8">
        <Timer :timer="30" :start="isFocused" @time-up="blurInput" />
        <p :class="[mistakes > 0 ? 'text-red-200' : 'text-white']">
          Mistakes: {{ mistakes }}
        </p>
      </nav>
      <Char
        class="transition-colors duration-300"
        v-for="(char, charIndex) in actualCharacters"
        :key="char"
        :actual="char"
        :typed="typedCharacters?.[charIndex]"
        @mistake="mistakes++"
      />
      <input
        type="text"
        class="sr-only"
        ref="inputRef"
        :value="typed"
        @input="handleInput"
      />
    </div>
  </div>
</template>
