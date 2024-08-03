export const useTimer = (t: number, ready: Ref<boolean>) => {
  const countDown = ref(t);

  let timer: ReturnType<typeof setInterval> | null = null;

  const clean = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const start = () => {
    if (!timer) {
      timer = setInterval(() => {
        if (countDown.value <= 0) {
          clean();
        } else {
          countDown.value -= 1;
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
    }
  });

  return countDown;
};
