import React, { PureComponent } from "react";
import { FlatList, Alert, Text, StyleSheet } from "react-native";
import isArray from "lodash/isArray";

/* my module */
import NewsAPI from "../api/news-api";
import { tokenNewsAPI } from "../constants/tokens";
import SectionSource from "../components/sources-screen/section-source";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class SourcesScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true
    };
    this.initialComponent = true; // flag for loading placeholder
    this._newsAPI = new NewsAPI(tokenNewsAPI);
  }

  componentDidMount() {
    this.getListSources();
  }

  getListSources = async () => {
    try {
      await this.setStateProms("loading", true);
      const resultReq = await this._newsAPI.getSources();
      if (!has(resultReq, "data")) {
        throw new Error(resultReq);
      }

      if (this.initialComponent) {
        this.initialComponent = false;
      }

      this.setState({
        loading: false,
        data: resultReq.data.sources
      });
    } catch (e) {
      await this.setStateProms("loading", false);
      Alert("Server Error", isArray(e) ? JSON.stringify(e) : e.toString());
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

  _renderItem = item => <SectionSource {...item} />;

  render() {
    return (
      <FlatList
        removeClippedSubviews
        style={styles.styles}
        data={this.state.data}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

export default SourcesScreen;
