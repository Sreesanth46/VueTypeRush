export const useSettings = () => {
  const wpm = useLocalStorage("wpm", 30);
  const level = useLocalStorage("level", "random");

  return { wpm, level };
};
