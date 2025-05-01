import { create } from "zustand";

export const useLoadWordsStore = create<{
  loadWordsToggle: boolean;
  toggleLoadWords: () => void;
}>((set, get) => ({
  loadWordsToggle: false,
  toggleLoadWords: () => set({ loadWordsToggle: !get().loadWordsToggle }),
}));
