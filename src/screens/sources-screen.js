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
import NotFound from "../components/etc/not-found";
import SectionSource from "../components/sources-screen/section-source";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f3f3"
  },
  sectionList: {
    paddingLeft: 12,
    paddingRight: 12,
    marginVertical: 8
  },
  label: {
    color: "black",
    fontWeight: "700"
  }
});

class SourcesScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false
    };
    this.initialComponent = true; // flag for loading placeholder
    this._newsAPI = new NewsAPI(Tokens.newsAPI);
  }

  componentDidMount() {
    this.getListSources();
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

  _renderItem = ({ item, index }) => (
    <SectionSource
      index={index}
      name={item.name}
      url={item.url}
      onPress={this._navigateToArticleScreen(item)}
    />
  );

  _navigateToArticleScreen = item => {
    this.props.navigation.navigate();
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
            <Text style={styles.label}>{item.title}</Text>
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
