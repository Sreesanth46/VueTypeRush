export type TLevels = "beginner" | "intermediate" | "advanced" | "expert";

export type TLevelsWithRandom = "random" | TLevels;

export type TSentence = {
  [key in TLevels]: string[];
};
