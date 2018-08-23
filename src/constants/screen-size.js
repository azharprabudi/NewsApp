import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("screen");
export const orientation = width > height ? "landscape" : "portrait";
