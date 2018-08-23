import React from "react";
import { View } from "react-native";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";

/* screen */
import SourcesScreen from "../screens/sources-screen";
import ArticlesScreen from "../screens/articles-screen";
import Colors from "../constants/colors";

const Navigators = createSwitchNavigator(
  {
    Main: createStackNavigator(
      {
        Sources: {
          screen: SourcesScreen,
          navigationOptions: {
            title: "List Sources",
            headerLeft: <View />,
            headerRight: <View />,
            headerTitleStyle: {
              flex: 1,
              textAlign: "center",
              color: "black"
            }
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
