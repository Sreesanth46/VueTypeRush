import { Sentences } from "~/constants/sentences";
import type { TLevels } from "~/types";
import { useStorage } from "@vueuse/core";

const randomIndex = (len: number) => Math.floor(Math.random() * len);

const randomLevel = (): TLevels => {
  const levels = Object.keys(Sentences) as TLevels[];
  return levels[randomIndex(levels.length)];
};

export const useSentence = (level: TLevels = randomLevel()) => {
  const sentences = Sentences[level];

  let ri = randomIndex(sentences.length);
  const random = useStorage("random", ri);

  while (random.value === ri) {
    ri = randomIndex(sentences.length);
  }

  random.value = ri;

  return sentences[random.value];
};
