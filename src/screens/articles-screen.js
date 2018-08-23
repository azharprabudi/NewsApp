import React, { PureComponent } from "react";
import { Flatlist, Alert, ScrollView, StyleSheet, View } from "react-native";
import { CachedImage } from "react-native-img-cache";
import isArray from "lodash/isArray";

/* my module */
import NewsAPI from "../api/news-api";
import Tokes from "../constants/tokens";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f3f3"
  },
  content: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingHorizontal: 5
  },
  image: {
    marginTop: -20
  }
});

class ArticlesScreen extends PureComponent {
  static PARAMS_DATA_SOURCE = "PARAMS_DATA_SOURCE";
  static PARAMS_SEARCH_VALUE = "PARAMS_SEARCH_VALUE";
  static PARAMS_ONCHANGE_SEARCH = "PARAMS_ONCHANGE_SEARCH";
  static PARAMS_ONCLEAR_SEARCH = "PARAMS_ONCLEAR_SEARCH";

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [],
      loading: true
    };
    this._page = 1;
    this._params = props.navigation.getParam(
      ArticlesScreen.PARAMS_DATA_SOURCE,
      { id: "", url: "", name: "", description: "", category: "" }
    );
    this._newsAPI = new NewsAPI(Tokes.newsAPI);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      [ArticlesScreen.PARAMS_SEARCH_VALUE]: this.state.search,
      [ArticlesScreen.PARAMS_ONCHANGE_SEARCH]: this.callbackOnChangeSearch,
      [ArticlesScreen.PARAMS_ONCLEAR_SEARCH]: this.callbackOnClearSearch
    });
  }

  callbackOnClearSearch = () => {
    this.callbackOnChangeSearch("");
  };

  callbackOnChangeSearch = value => {
    this.setState(
      {
        ...this.state,
        search: value
      },
      () =>
        this.props.navigation.setParams({
          [ArticlesScreen.PARAMS_SEARCH_VALUE]: value
        })
    );
  };

  getListArticles = async (isScrollToBottom = false) => {
    try {
      const resultReq = await this._newsAPI.getArticles(
        this._params.id,
        this.state.search,
        this._page
      );
      if (!isArray(resultReq)) {
        throw new Error(resultReq);
      }

      this.setState(
        {
          ...this.state,
          loading: false,
          data: [...this.state.data, ...resultReq]
        },
        () => {
          if (isScrollToBottom) {
            this._page += 1;
          }
        }
      );
    } catch (e) {
      Alert.alert(isArray(e) ? JSON.stringify(e) : e.toString());
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <CachedImage
            mutable={true}
            source={{
              uri: `http://icon-locator.herokuapp.com/icon?url=${
                this._params.url
              }&amp;size=70..120..200`
            }}
            resizeMode={"cover"}
            style={styles.image}
          />
        </View>
      </ScrollView>
    );
  }
}

export default ArticlesScreen;
