export type Word = {
  id: number;
  index: number;
  value: string;
  revealed: number;
};

export type SelectWordsRequest = {
  words: string[];
};
