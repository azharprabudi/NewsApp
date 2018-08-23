import React from "react";
import axios from "axios";
import has from "lodash/has";
import upperFirst from "lodash/upperFirst";

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
    /* create data as section want */
    for (let i = 0; i < result.data.sources.length; i++) {
      let item = result.data.sources[i];
      let iLeft = 0;
      let iRight = data.length - 1;
      let index = data.length == 0 ? 0 : data.length;

      while (iLeft <= iRight) {
        if (
          has(data[iLeft], "title") &&
          data[iLeft].title === upperFirst(item.category)
        ) {
          index = iLeft;
          break;
        }

        if (
          has(data[iRight], "title") &&
          data[iRight].title === upperFirst(item.category)
        ) {
          index = iRight;
          break;
        }

        iLeft++;
        iRight--;
      }

      if (!data[index]) {
        data[index] = { title: upperFirst(item.category), data: [] };
      }
      data[index].data.push(item);
    }
    return data;
  }

  async getArticles(sources = "", search = "", page = 1) {
    let URL = `/everything?sources=${sources}&page=${page}&sortBy=publishedAt`;
    if (search.replace(/\s/g, "") !== "") {
      URL += `&q=${search}`;
    }
    const result = await this._axios.get(URL);
    return result;
  }
}

export default NewsAPI;
