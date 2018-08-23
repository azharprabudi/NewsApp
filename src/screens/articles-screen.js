import React, { PureComponent } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Animated,
  RefreshControl
} from "react-native";
import { CachedImage } from "react-native-img-cache";
import upperFirst from "lodash/upperFirst";
import isArray from "lodash/isArray";

/* my module */
import NewsAPI from "../api/news-api";
import Tokens from "../constants/tokens";
import SectionArticle from "../components/articles-screen/section-article";
import WebviewScreen from "./webview-screen";
import Colors from "../constants/colors";

const HEADER_SCROLL_DISTANCE = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    paddingHorizontal: 8
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10
  },
  wrapperImage: {
    width: 120,
    height: 130,
    left: 18,
    zIndex: 10,
    borderRadius: 5,
    elevation: 2,
    position: "absolute"
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5
  },
  informationSource: {
    marginLeft: 125,
    flexWrap: "wrap"
  },
  informationTitle: {
    fontSize: 16,
    color: "black",
    fontWeight: "700"
  },
  informationLabel: {
    fontSize: 10,
    color: "rgba(0,0,0,0.5)",
    textAlign: "justify",
    lineHeight: 18
  },
  wrapperArticles: {
    flex: 1,
    marginVertical: 8,
    borderTopWidth: 1,
    borderColor: "#f3f3f3"
  },
  sectionTitle: {
    fontSize: 18,
    color: "black",
    fontWeight: "700"
  }
});

class ArticlesScreen extends PureComponent {
  static PARAMS_DATA_SOURCE = "PARAMS_DATA_SOURCE";
  static PARAMS_SEARCH_VALUE = "PARAMS_SEARCH_VALUE";
  static PARAMS_ONCLEAR_SEARCH = "PARAMS_ONCLEAR_SEARCH";
  static PARAMS_ONCHANGE_SEARCH = "PARAMS_ONCHANGE_SEARCH";
  static PARAMS_ON_SUBMITEDITING = "PARAMS_ON_SUBMITEDITING";

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [],
      loading: false
    };
    this._page = 1;
    this._params = props.navigation.getParam(
      ArticlesScreen.PARAMS_DATA_SOURCE,
      { id: "", url: "", name: "", description: "", category: "" }
    );
    this._newsAPI = new NewsAPI(Tokens.newsAPI);
    this._scrollYAnimated = new Animated.Value(0);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      [ArticlesScreen.PARAMS_SEARCH_VALUE]: this.state.search,
      [ArticlesScreen.PARAMS_ONCHANGE_SEARCH]: this.callbackOnChangeSearch,
      [ArticlesScreen.PARAMS_ONCLEAR_SEARCH]: this.callbackOnClearSearch,
      [ArticlesScreen.PARAMS_ON_SUBMITEDITING]: this.callbackOnSubmitEditing
    });

    this.getListArticles(true);
  }

  callbackOnSubmitEditing = () => {
    this.getListArticles(false, true);
  };

  callbackOnClearSearch = () => {
    this.callbackOnChangeSearch("", this.getListArticles);
  };

  callbackOnChangeSearch = (value, callback = () => {}) => {
    this.setState(
      {
        ...this.state,
        search: value
      },
      () => {
        this.props.navigation.setParams({
          [ArticlesScreen.PARAMS_SEARCH_VALUE]: value
        });
        callback();
      }
    );
  };

  onScrollFetchData = () => {
    this.getListArticles(true);
  };

  getListArticles = async (isScrollToBottom = false, isSearch = false) => {
    try {
      if (isSearch) {
        this._page = 1;
      }
      await this.setStateProms("loading", true);

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
          data: !isSearch ? [...this.state.data, ...resultReq] : resultReq
        },
        () => {
          if (isScrollToBottom) {
            this._page += 1;
          }
        }
      );
    } catch (e) {
      await this.setStateProms("loading", false);
      Alert.alert(isArray(e) ? JSON.stringify(e) : e.toString());
    }
  };

  setStateProms = (stateName, value) => {
    return new Promise(resolve => {
      if (this.state[stateName] !== value) {
        this.setState(
          {
            ...this.state,
            [stateName]: value
          },
          resolve
        );
      } else {
        resolve();
      }
    });
  };

  _renderItem = ({ item, index }) => (
    <SectionArticle
      {...item}
      index={index}
      onPress={this._openUrlLink(item.url, item.title)}
    />
  );

  _openUrlLink = (url, title) => () => {
    this.props.navigation.navigate("Webview", {
      [WebviewScreen.PARAMS_TITLE_WEBVIEW]: title,
      [WebviewScreen.PARAMS_URL_WEBVIEW]: url
    });
  };

  hideInformationHeader = data => {
    console.log(data);
  };

  render() {
    const marginTopContent = this._scrollYAnimated.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [80, 0]
    });
    const topWrapperImage = this._scrollYAnimated.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE - 10],
      outputRange: [15, 0]
    });
    const opacityWrapperImage = this._scrollYAnimated.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE - 10],
      outputRange: [1, 0]
    });
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View
          style={[
            styles.wrapperImage,
            { top: topWrapperImage, opacity: opacityWrapperImage }
          ]}
        >
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
        </Animated.View>
        <Animated.View
          style={[
            styles.content,
            {
              marginTop: marginTopContent
            }
          ]}
        >
          <View style={styles.informationSource}>
            <Text style={styles.informationTitle}>{`${`${
              this._params.name
            } (${upperFirst(this._params.category)})`}`}</Text>
            <Text style={styles.informationLabel}>{this._params.url}</Text>
            <Text style={styles.informationLabel}>
              {this._params.description}
            </Text>
          </View>
          <View style={styles.wrapperArticles}>
            <Text style={styles.sectionTitle}>List Articles</Text>
            <FlatList
              initialNumToRender={10}
              removeClippedSubviews={true}
              data={this.state.data}
              renderItem={this._renderItem}
              keyExtractor={({ url }) => url}
              onScroll={Animated.event([
                {
                  nativeEvent: {
                    contentOffset: {
                      y: this._scrollYAnimated
                    }
                  }
                }
              ])}
              refreshControl={
                <RefreshControl
                  colors={[Colors.primary]}
                  refreshing={this.state.loading}
                />
              }
              onEndReached={this.onScrollFetchData}
              onEndReachedThreshold={1}
            />
          </View>
        </Animated.View>
      </ScrollView>
    );
  }
}

export default ArticlesScreen;
