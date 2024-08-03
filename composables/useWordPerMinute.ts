/**
 * A composable function that calculates the time needed to type a given sentence.
 *
 * @param {string} sentence - The sentence for which the typing time is to be calculated.
 * @param {number} [wpm] - Words per minute, if not provided defaulting to the last wpm of the user or 30.
 * @returns {number} The estimated time in seconds to complete typing the sentence.
 *
 * @example
 * const sentence = "The quick brown fox jumps over the lazy dog";
 * const timeToType = useTypingTime(sentence, 60);
 *
 */
export const useWordPerMinute = (sentence: string, wpm?: number) => {
  const words = sentence.split(" ");
  const totalWords = words.length;
  // use the parameter wpm if available
  const wordsPerMinute = wpm ? wpm : useLocalStorage("wpm", 30);
  const wps = toValue(wordsPerMinute) / 60; // word per second

  return computed(() => Math.ceil(totalWords / wps));
};
