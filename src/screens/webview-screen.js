import React, { PureComponent } from "react";
import { WebView, ActivityIndicator, View, StyleSheet } from "react-native";

/* my modules */
import Colors from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "white",
    alignItems: "center"
  }
});

class WebviewScreen extends PureComponent {
  static PARAMS_TITLE_WEBVIEW = "PARAMS_TITLE_WEBVIEW";
  static PARAMS_URL_WEBVIEW = "PARAMS_URL_WEBVIEW";

  constructor(props) {
    super(props);
    this._paramsUrl = props.navigation.getParam(
      WebviewScreen.PARAMS_URL_WEBVIEW,
      ""
    );
  }

  _renderLoading = () => (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.primary} size={24} />
    </View>
  );

  render() {
    return (
      <WebView
        startInLoadingState={true}
        renderError={this._renderError}
        source={{ uri: this._paramsUrl }}
        renderLoading={this._renderLoading}
      />
    );
  }
}

export default WebviewScreen;
