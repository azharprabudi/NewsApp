import has from "lodash/has";
import axios from "axios";

class NewsAPI {
  constructor(token) {
    this._axios = axios.create({
      baseUrl: "https://newsapi.org/v2",
      timeout: 3000,
      headers: {
        Authorization: token
      }
    });
  }

  async getSources() {
    const result = await this._axios.get("/sources?country=us&language=en");
    if (has(result, "data")) {
      return result.data;
    }
    return result;
  }

  async getArticles(sources = "", page = 1) {
    const result = await this._axios.get(
      `/everything?sources=${sources}&page=${page}&sortBy=publishedAt`
    );
    if (has(result, "data")) {
      return result.data;
    }
    return result;
  }
}

export default NewsAPI;
