<script lang="ts" setup>
const props = defineProps<{
  timer: number;
  start: boolean;
}>();

const emit = defineEmits<{
  timeUp: [];
}>();

const { counter, pause } = useInterval(1000, {
  controls: true,
});

const countDown = computed(() => {
  if (!props.start && counter.value !== props.timer + 1) return props.timer;

  const remainingTime = props.timer - counter.value;
  if (remainingTime < 0) {
    pause();
    emit("timeUp");
    return "Time is up!";
  } else return remainingTime;
});
</script>

<template>
  <p>{{ countDown }}</p>
</template>
