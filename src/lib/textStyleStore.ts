import { create } from "zustand";

interface TextStyleState {
  fontSize: number;
  textColor: string;
  fontFamily: string;
  textAlignment: string;
  lineHeight: number;
}

interface TextStyleActions {
  setTextAlignment: (alignment: string) => void;
  setFontSize: (size: number) => void;
  setTextColor: (color: string) => void;
  setFontFamily: (font: string) => void;
  setLineHeight: (height: number) => void;
}

export const useTextStyleStore = create<TextStyleState & TextStyleActions>(
  (set) => ({
    fontSize: 16,
    textColor: "primary",
    fontFamily: "",
    textAlignment: "",
    lineHeight: 1.3,

    setTextAlignment: (alignment: string) => set({ textAlignment: alignment }),
    setFontSize: (size: number) => set({ fontSize: size }),
    setTextColor: (color: string) => set({ textColor: color }),
    setFontFamily: (font: string) => set({ fontFamily: font }),
    setLineHeight: (height: number) => set({ lineHeight: height }),
  })
);
