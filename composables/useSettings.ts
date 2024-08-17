const wpm = useLocalStorage<number>("wpm", 30);
const level = useLocalStorage<TLevelsWithRandom>("level", "random");
import { Sentences } from "~/constants/sentences";
import type { TLevels, TLevelsWithRandom } from "~/types";

const randomIndex = (len: number) => Math.floor(Math.random() * len);

const randomLevel = (): TLevels => {
  const levels = Object.keys(Sentences) as TLevels[];
  return levels[randomIndex(levels.length)];
};

const getSentence = () => {
  const _level = level.value === "random" ? randomLevel() : level.value;
  const sentences = Sentences[_level];
  let ri = randomIndex(sentences.length);
  const random = useLocalStorage("random", ri);

  while (random.value === ri) {
    ri = randomIndex(sentences.length);
  }
  random.value = ri;
  return sentences[random.value];
};

const settings = reactive({
  sentence: getSentence(),
  isFocused: false,
  typed: "",
  timer: 0,
  mistakes: 0,
});

export const useSettings = () => {
  const settingsAsRefs = toRefs(settings);

  onMounted(() => {
    calculateTime();
  });

  watch(settingsAsRefs.sentence, () => {
    calculateTime();
    settings.typed = "";
    settings.mistakes = 0;
  });

  watch(level, () => {
    settings.sentence = getSentence();
  });

  const calculateTime = () => {
    const words = settings.sentence.split(" ");
    const totalWords = words.length;
    const wps = wpm.value / 60; // word per second;
    settingsAsRefs.timer.value = Math.ceil(totalWords / wps);
  };

  let startTime: Date | null;
  let endTime: Date | null;

  function dt(): number {
    // TODO: if this fn() is used anywhere else update with params and export
    if (!startTime || !endTime) return 0;

    const ms = Math.abs(endTime.getTime() - startTime.getTime());
    return Math.round(ms / 1000);
  }

  const calculate = () => {
    const typedWords = settings.typed.split(" ");
    const actualWords = settings.sentence.split(" ");

    const correctWords = actualWords.reduce((count, actualWord, index) => {
      let correctWordCount = count;
      if (
        index < typedWords.length &&
        actualWord.localeCompare(typedWords[index]) === 0
      ) {
        correctWordCount += 1;
      }
      return correctWordCount;
    }, 0);

    const timeTaken = dt();
    startTime = null;
    endTime = null;

    if (correctWords > 0) {
      const wordPerMinute = Math.floor(correctWords / (timeTaken / 60));
      wpm.value = wordPerMinute;
    }
  };

  watch(settingsAsRefs.isFocused, () => {
    if (settingsAsRefs.isFocused.value) {
      startTime = new Date();
    } else if (startTime) {
      // set endTime if startTime is not null
      endTime = new Date();
      calculate();
    }
  });

  return {
    ...settingsAsRefs,
    timer: readonly(settingsAsRefs.timer),
    wpm,
    level,
  };
};
