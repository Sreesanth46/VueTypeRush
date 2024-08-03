export const useWordPerMinute = (sentence: string, wpm?: number) => {
  const words = sentence.split(" ");
  const totalWords = words.length;

  const wps = wpm ?? 30 / 60; // word per second

  return computed(() => totalWords / wps);
};
