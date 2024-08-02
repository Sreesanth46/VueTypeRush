export type TLevels = "beginner" | "intermediate" | "advanced" | "expert";

export type TSentence = {
  [key in TLevels]: string[];
};
