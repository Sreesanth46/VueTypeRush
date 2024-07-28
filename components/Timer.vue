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
  if (!props.start && counter.value !== props.timer + 1) {
    return {
      class: "text-white",
      timer: props.timer,
    };
  }

  const remainingTime = props.timer - counter.value;

  if (remainingTime < 0) {
    pause();
    emit("timeUp");
    return {
      class: "text-red-500 font-bold",
      timer: "Time is up!",
    };
  } else {
    let styleClass = "text-white";
    if (remainingTime <= 10) styleClass = "text-red-400 animate-ping";
    return {
      class: styleClass,
      timer: remainingTime,
    };
  }
});
</script>

<template>
  <p :class="countDown.class">
    {{ countDown.timer }}
  </p>
</template>
