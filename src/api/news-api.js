import React from "react";
import axios from "axios";
import has from "lodash/has";

class NewsAPI {
  constructor(token) {
    this._axios = axios.create({
      baseURL: "http://newsapi.org/v2",
      timeout: 3000,
      headers: {
        "X-Api-Key": token
      }
    });
  }

  async getSources() {
    const result = await this._axios.get("/sources?country=us&language=en");
    if (!has(result, "data")) {
      return result;
    }

    let data = [];
    let index = -1;
    let tempSeparator = "";

    /* create data as section want */
    for (let i = 0; i < result.data.sources.length; i++) {
      let value = result.data.sources[i];
      let separator = value.name.charAt(0).toUpperCase();

      if (tempSeparator !== separator) {
        index += 1;
      }

      if (!data[index]) {
        data[index] = {
          title: separator,
          data: []
        };
      }
      data[index].data.push(value);
      tempSeparator = separator;
    }
    return data;
  }

  async getArticles(sources = "", page = 1) {
    const result = await this._axios.get(
      `/everything?sources=${sources}&page=${page}&sortBy=publishedAt`
    );
    return result;
  }
}

export default NewsAPI;
