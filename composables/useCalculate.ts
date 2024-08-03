const wpm = useLocalStorage("wpm", 30);

export const useCalculate = (
  sentence: string,
  typed: Ref<string>,
  start: Ref<boolean>
) => {
  let startTime: Date | null;
  let endTime: Date | null;

  watch(start, () => {
    if (start.value) {
      startTime = new Date();
    } else if (startTime) {
      // set endTime if startTime is not null
      endTime = new Date();
      calculate();
    }
  });

  function dt(): number {
    // TODO: if this fn() is used anywhere else update with params and export
    if (!startTime || !endTime) return 0;

    const ms = Math.abs(endTime.getTime() - startTime.getTime());
    return Math.round(ms / 1000);
  }

  const calculate = () => {
    const typedWords = typed.value.split(" ");
    const actualWords = sentence.split(" ");

    const correctWords = actualWords.reduce((count, actualWord, index) => {
      if (
        index < typedWords.length &&
        actualWord.localeCompare(typedWords[index]) === 0
      ) {
        return (count += 1);
      } else {
        return count;
      }
    }, 0);

    const timeTaken = dt();
    const wordPerMinute = Math.floor(correctWords / (timeTaken / 60));
    wpm.value = wordPerMinute;
  };
};
