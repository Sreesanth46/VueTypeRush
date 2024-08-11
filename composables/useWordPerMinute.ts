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
export const useWordPerMinute = (sentence: Ref<string>, wpm: Ref<number>) => {
  return computed(() => {
    const words = sentence.value.split(" ");
    const totalWords = words.length;
    const wps = wpm.value / 60; // word per second

    return Math.ceil(totalWords / wps);
  });
};
