<script lang="ts" setup>
const props = defineProps<{
  timer: number;
  start: boolean;
}>();

const emit = defineEmits<{
  timeUp: [];
}>();

const startRef = toRef(props, "start");
const timerRef = toRef(props, "timer");
const { counter, isActive } = useTimer(timerRef, startRef);

const countDown = computed(() => {
  const minutes = Math.floor(counter.value / 60);
  const seconds = minutes ? counter.value % 60 : counter.value;
  const time = `0${minutes} : ${seconds <= 0 ? `0${seconds}` : seconds}`;

  const obj: {
    class: string;
    time: string;
  } = {
    class: "text-white",
    time,
  };

  if (counter.value <= 0 && isActive.value) {
    // emits that the counter has reached Zero
    emit("timeUp");

    obj.class = "text-red-500 font-bold";
    obj.time = "Time is up!";
  } else if (counter.value <= 5 && isActive.value) {
    obj.class = "text-red-400 animate-ping";
  }

  return obj;
});
</script>

<template>
  <p :class="countDown.class">
    {{ countDown.time }}
  </p>
</template>
