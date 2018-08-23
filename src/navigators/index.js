import React from "react";
import { View, Text } from "react-native";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";

/* screen */
import InputIcon from "../components/etc/input-icon";
import SourcesScreen from "../screens/sources-screen";
import ArticlesScreen from "../screens/articles-screen";
import WebviewScreen from "../screens/webview-screen";
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
              color: "white"
            },
            headerStyle: {
              backgroundColor: Colors.primary
            }
          }
        },
        Articles: {
          screen: ArticlesScreen,
          navigationOptions: ({ navigation }) => ({
            headerTitle: (
              <InputIcon
                useClearValue
                iconLeft={{
                  name: "md-search",
                  color: "white",
                  size: 24
                }}
                iconClearValue={{
                  name: "md-close",
                  color: "white",
                  size: 24
                }}
                onClearValue={navigation.getParam(
                  ArticlesScreen.PARAMS_ONCLEAR_SEARCH,
                  () => {}
                )}
                onChangeText={navigation.getParam(
                  ArticlesScreen.PARAMS_ONCHANGE_SEARCH,
                  () => {}
                )}
                underlineColorAndroid={"white"}
                value={navigation.getParam(
                  ArticlesScreen.PARAMS_SEARCH_VALUE,
                  ""
                )}
                placeholder={"Search Article"}
              />
            ),
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: Colors.primary
            }
          })
        },
        Webview: {
          screen: WebviewScreen,
          navigationOptions: {
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: Colors.primary
            }
          }
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
