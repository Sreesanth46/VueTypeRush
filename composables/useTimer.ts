/**
 * A composable function that manages a countdown timer.
 *
 * @param seconds The initial number of seconds for the countdown timer.
 * @param ready A reactive reference (Ref<boolean>) that controls whether the timer should start or stop.
 *              When set to true, the timer starts; when false, the timer stops.
 * @returns An object containing:
 *          - counter: A reactive reference to the current time left (in seconds)
 *          - isActive: A boolean indicating whether the timer is active or not.
 */
export const useTimer = (seconds: Ref<number>, ready: Ref<boolean>) => {
  const counter = ref(seconds.value);
  const isActive = ref(false);

  watch(seconds, () => {
    clean();
    counter.value = seconds.value;
  });

  let timer: ReturnType<typeof setInterval> | null = null;

  const clean = () => {
    if (timer) {
      clearInterval(timer);
      isActive.value = false;
      timer = null;
    }
  };

  const start = () => {
    if (!timer) {
      isActive.value = true;
      timer = setInterval(() => {
        if (counter.value <= 0) {
          clean();
        } else {
          counter.value -= 1;
        }
      }, 1000);
    }
  };

  onMounted(() => {
    if (ready.value) {
      start();
    }
  });

  onUnmounted(() => {
    if (timer) {
      clean();
    }
  });

  watchEffect(() => {
    if (ready.value) {
      start();
    } else if (timer) {
      clean();
    }
  });

  return { counter, isActive };
};
