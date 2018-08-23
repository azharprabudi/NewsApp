import React, { PureComponent } from "react";
import { WebView } from "react-native";

class WebviewScreen extends PureComponent {
  static PARAMS_URL_WEBVIEW = "PARAMS_URL_WEBVIEW";

  constructor(props) {
    super(props);
    this._paramsUrl = props.navigation.getParam(
      WebviewScreen.PARAMS_URL_WEBVIEW,
      ""
    );
  }

  render() {
    return <WebView source={{ uri: this._paramsUrl }} />;
  }
}

export default WebviewScreen;
