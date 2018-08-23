import { AppRegistry } from "react-native";
import Navigators from "./src/navigators";

console.disableYellowBox = true;
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

AppRegistry.registerComponent("NewsApp", () => Navigators);
