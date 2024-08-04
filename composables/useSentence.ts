import { Sentences } from "~/constants/sentences";
import type { TLevels } from "~/types";
import { useStorage } from "@vueuse/core";

const randomIndex = (len: number) => Math.floor(Math.random() * len);

const randomLevel = (): TLevels => {
  const levels = Object.keys(Sentences) as TLevels[];
  return levels[randomIndex(levels.length)];
};

export const useSentence = (level: Ref<TLevels | "random">) => {
  const getSentence = () => {
    const _level = level.value === "random" ? randomLevel() : level.value;
    const sentences = Sentences[_level];

    let ri = randomIndex(sentences.length);
    const random = useStorage("random", ri);

    while (random.value === ri) {
      ri = randomIndex(sentences.length);
    }

    random.value = ri;
    return sentences[random.value];
  };

  const sentence = ref(getSentence());
  watch(level, () => {
    sentence.value = getSentence();
  });

  return sentence;
};
