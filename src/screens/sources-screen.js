import React, { PureComponent } from "react";
import {
  FlatList,
  Alert,
  StyleSheet,
  Text,
  RefreshControl,
  ScrollView,
  View
} from "react-native";
import isArray from "lodash/isArray";

/* my module */
import NewsAPI from "../api/news-api";
import Tokens from "../constants/tokens";
import ArticlesScreen from "./articles-screen";
import SectionSource from "../components/sources-screen/section-source";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3"
  },
  sectionList: {
    paddingLeft: 12,
    paddingRight: 12,
    marginVertical: 8
  },
  wrapperLabel: {
    marginVertical: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  labelLeft: {
    color: "black",
    fontWeight: "400",
    fontSize: 18
  },
  labelRight: {
    fontSize: 12,
    color: "rgba(0,0,0,0.5)"
  }
});

class SourcesScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      data: [
        {
          title: "Test",
          data: [
            {
              category: "general",
              country: "us",
              description:
                "Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.",
              id: "abc-news",
              language: "en",
              name: "ABC News",
              url: "http://abcnews.go.com"
            }
          ]
        }
      ],
      loading: false
    };
    this.initialComponent = true; // flag for loading placeholder
    this._newsAPI = new NewsAPI(Tokens.newsAPI);
  }

  componentDidMount() {
    // this.getListSources();
  }

  getListSources = async () => {
    try {
      await this.setStateProms("loading", true);
      const resultReq = await this._newsAPI.getSources();
      if (!isArray(resultReq)) {
        throw new Error(resultReq);
      }

      if (this.initialComponent) {
        this.initialComponent = false;
      }

      this.setState({
        loading: false,
        data: resultReq
      });
    } catch (e) {
      await this.setStateProms("loading", false);
      Alert.alert(
        "Server Error",
        isArray(e) ? JSON.stringify(e) : e.toString()
      );
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

  _keyExtractor = ({ id }) => id;

  _renderItem = ({ item }) => (
    <SectionSource
      name={item.name}
      url={item.url}
      onPress={this._navigateToArticleScreen(item)}
    />
  );

  _navigateToArticleScreen = item => () => {
    this.props.navigation.navigate("Articles", {
      [ArticlesScreen.PARAMS_DATA_SOURCE]: item
    });
  };

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            onRefresh={this.getListSources}
            refreshing={this.state.loading}
          />
        }
      >
        {this.state.data.map(item => (
          <View style={styles.sectionList} key={item.title}>
            <View style={styles.wrapperLabel}>
              <Text style={styles.labelLeft}>{item.title}</Text>
              <Text style={styles.labelRight}>
                Swipe From Right To The Left
              </Text>
            </View>
            <FlatList
              horizontal={true}
              data={item.data}
              removeClippedSubviews
              initialNumToRender={5}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ))}
      </ScrollView>
    );
  }
}

export default SourcesScreen;
