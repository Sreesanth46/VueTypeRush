<script setup lang="ts">
import { ref, computed } from "vue";
import ThunderSkullIcon from "~/components/icons/ThunderSkullIcon";

const inputRef = ref<HTMLInputElement | null>(null);
const { sentence, timer, typed, isFocused, wpm, level, mistakes, reset } =
  useSettings();

onStartTyping(() => {
  focusInput();
});

const focusInput = () => {
  // if already focused skip
  if (isFocused.value) return;

  if (inputRef.value && !typed.value) {
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
  return sentence.value.split("").map((char, index) => ({ char, index }));
});

const typedCharacters = computed(() => {
  return typed.value.split("");
});

const hasFinished = computed(
  () => sentence.value.localeCompare(typed.value) === 0
);

watch(hasFinished, (finished) => {
  if (finished) {
    blurInput();
  }
});
</script>

<template>
  <div
    class="h-screen whitespace-normal text-2xl md:text-3xl leading-10 md:leading-relaxed sm:flex sm:items-center select-none"
  >
    <Header v-model:wpm="wpm" v-model:level="level" @retry="reset" />
    <ArtDot />
    <div class="container mx-auto p-6">
      <nav class="flex gap-4 mb-8">
        <Timer :timer="timer" :start="isFocused" @time-up="blurInput" />
        <p
          class="ml-4 flex gap-2 items-center"
          :class="[mistakes > 0 ? 'text-red-200' : 'text-white']"
        >
          <ThunderSkullIcon /> Mistakes : {{ mistakes }}
        </p>
      </nav>
      <Char
        class="transition-colors duration-300"
        v-for="{ char, index: charIndex } in actualCharacters"
        :key="charIndex"
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
        @paste.prevent
      />
    </div>
  </div>
</template>
