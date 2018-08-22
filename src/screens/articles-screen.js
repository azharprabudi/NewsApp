import React, { PureComponent } from "react";
import { Flatlist } from "react-native";

/* my module */
import NewsAPI from "../api/news-api";
import { tokenNewsAPI } from "../constants/tokens";

class ArticlesScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true
    };
    this._newsAPI = new NewsAPI(tokenNewsAPI);
  }

  componentDidMount() {
    this.getListSources();
  }

  getListSources = () => {};

  render() {
    return <Flatlist data={this.state.data} />;
  }
}

export default ArticlesScreen;
