import { View } from "react-native";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";

/* screen */
import SourcesScreen from "../screens/sources-screen";
import ArticlesScreen from "../screens/articles-screen";

const Navigators = createSwitchNavigator(
  {
    Main: createStackNavigator(
      {
        Sources: {
          screen: SourcesScreen,
          navigationOptions: {
            header: null
          }
        },
        Articles: {
          screen: ArticlesScreen
        }
      },
      {
        initialRouteName: "Sources"
      }
    )
  },
  {
    initialRouteName: "Main"
  }
);

export default Navigators;
