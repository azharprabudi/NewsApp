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
import Tokes from "../constants/tokens";
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
    elevation: 4,
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
  static PARAMS_ONCHANGE_SEARCH = "PARAMS_ONCHANGE_SEARCH";
  static PARAMS_ONCLEAR_SEARCH = "PARAMS_ONCLEAR_SEARCH";

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [
        {
          source: {
            id: null,
            name: "Youbrandinc.com"
          },
          author: "Scott Scanlon",
          title: "Bitcoin Bitcoin Bitcoin BITCOIN!! So Sue Us.",
          description:
            "Crypto Briefing exists to advocate for the safe and responsible integration of blockchain and cryptocurrency into mainstream life. We believe. Our goal is to grow the crypto community – to help new converts understand the basics, and to help more experienced …",
          url:
            "https://www.youbrandinc.com/crytocurrency/bitcoin-bitcoin-bitcoin-bitcoin-so-sue-us/",
          urlToImage:
            "https://www.youbrandinc.com/wp-content/uploads/2018/05/Bitcoin-Trademarked-In-The-UK-In-Patent-Troll-Style-Action-1024x538.jpg",
          publishedAt: "2018-05-31T01:03:10Z"
        },
        {
          source: {
            id: null,
            name: "Youbrandinc.com"
          },
          author: "Scott Scanlon",
          title: "Bitcoin Cash vs. Bitcoin",
          description:
            "Satoshi’s message embedded into the first Bitcoin block provides a clear motivation for the creation of a decentralized currency. “The Times 03/Jan/2009 Chancellor on brink of second bailout for banks.” After the 2008 banking collapse and subsequent bailout w…",
          url:
            "https://www.youbrandinc.com/crytocurrency/bitcoin-cash-vs-bitcoin/",
          urlToImage:
            "https://www.youbrandinc.com/wp-content/uploads/2018/07/bitcoin-cash-vs-bitcoin-1024x512.png",
          publishedAt: "2018-07-29T06:03:08Z"
        },
        {
          source: {
            id: null,
            name: "Github.com"
          },
          author: "cl-bitcoin",
          title: "cl-bitcoin: cl-bitcoin",
          description: "cl-bitcoin - Peer to peer money",
          url: "https://github.com/cl-bitcoin/cl-bitcoin",
          urlToImage:
            "https://avatars0.githubusercontent.com/u/39051405?s=400&v=4",
          publishedAt: "2018-05-07T10:08:22Z"
        },
        {
          source: {
            id: null,
            name: "Bleepingcomputer.com"
          },
          author: "ergrgergreg",
          title: "Bitcoin SuPpOrt 18005716109 Bitcoin",
          description:
            "Bitcoin SuPpOrt 18005716109 Bitcoin - posted in Windows 10 Support: Bitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nB…",
          url:
            "https://www.bleepingcomputer.com/forums/t/673721/bitcoin-support-18005716109-bitcoin/",
          urlToImage:
            "https://www.bleepingcomputer.com/forums/public/style_images/master/meta_image.png",
          publishedAt: "2018-03-21T15:46:13Z"
        },
        {
          source: {
            id: null,
            name: "Thingiverse.com"
          },
          author: "Andsnow2020",
          title: "Bitcoin",
          description:
            "Today I bring you a dessign of a Bitcoin. I hope you will enjoy it,it is perfect for sharing with your friends.\nto see more designs similar to this or something interesting and different, please visit my home page where you will find more of my designs and fo…",
          url: "https://www.thingiverse.com/thing:3035331",
          urlToImage:
            "https://cdn.thingiverse.com/renders/89/16/34/0a/99/eb3c16f9446b06288df077f5f2dec40c_preview_featured.jpg",
          publishedAt: "2018-08-05T10:12:16Z"
        },
        {
          source: {
            id: null,
            name: "Hackernoon.com"
          },
          author: "BambouClub",
          title: "Bitcoin Has Cashflow: Lending Bitcoin",
          description:
            "There is a fallacy that Bitcoin has no CashFlow. That’s what Warren Buffet thinks.",
          url:
            "https://hackernoon.com/bitcoin-has-cashflow-lending-bitcoin-75733438f01a",
          urlToImage:
            "https://cdn-images-1.medium.com/max/1200/1*8F0GleFn0N-61Rf9u5V13w.png",
          publishedAt: "2018-05-21T01:49:44Z"
        },
        {
          source: {
            id: null,
            name: "Flickr.com"
          },
          author: "satoshinakamotoblog",
          title:
            "Bitcoin Not the Perpetrator for Russian Hacking Indictments • Bitcoin Information • Stay Bitcoin Information",
          description:
            "Bitcoin Not the Perpetrator for Russian Hacking Indictments • Bitcoin Information • Stay Bitcoin Information satoshinakamotoblog.com/bitcoin-not-the-culprit-for-russi...",
          url: "https://www.flickr.com/photos/163309847@N08/42930744125",
          urlToImage:
            "https://c2.staticflickr.com/2/1816/42930744125_8a3f29757e_b.jpg",
          publishedAt: "2018-08-04T02:52:16Z"
        },
        {
          source: {
            id: null,
            name: "Newsbtc.com"
          },
          author: "Joseph Young",
          title:
            "44 Bitcoin Forks Have Emerged Within 10 Months, Crypto Investors Not Convinced",
          description:
            "Bitcoin Private, Bitcoin Diamond, Bitcoin Gold, Bitcoin Atom, Bitcoin Candy, and Bitcoin Pizza are some of the 44 bitcoin forks that have emerged since the initial Bitcoin Cash hard fork in August of last year, as TNW reported. Within the past 10 months, 44 f…",
          url:
            "https://www.newsbtc.com/2018/06/25/44-bitcoin-forks-emerged-within-10-months-investors-not-taking-seriously/",
          urlToImage:
            "https://s3.amazonaws.com/main-newsbtc-images/2018/06/25033022/shutterstock_685257826.jpg",
          publishedAt: "2018-06-25T08:00:51Z"
        },
        {
          source: {
            id: null,
            name: "Thingiverse.com"
          },
          author: "KhanKudo",
          title: "Bitcoin",
          description:
            "Got bored and quickly made a bitcoin.I suggest painting or printing it in gold.",
          url: "https://www.thingiverse.com/thing:2982578",
          urlToImage:
            "https://cdn.thingiverse.com/renders/dc/f7/c9/37/5a/05f3d4f49db5b3482f6468551c2697ca_preview_featured.jpg",
          publishedAt: "2018-06-29T09:07:57Z"
        },
        {
          source: {
            id: null,
            name: "Maketecheasier.com"
          },
          author: "Andrew Braun",
          title: "Why Are There So Many Bitcoin Variants?",
          description:
            "There are plenty of cryptocurrencies around, and you can even create one yourself in minutes. Out of all these cryptocurrencies, there are plenty that come with the “Bitcoin” label that you will think are associated with Bitcoin. Think you have a handle on th…",
          url: "https://www.maketecheasier.com/why-so-many-bitcoin-variants/",
          urlToImage:
            "https://www.maketecheasier.com/assets/uploads/2018/05/bitcoin-types-feature.jpg",
          publishedAt: "2018-05-25T05:25:25Z"
        }
      ],
      loading: false
    };
    this._page = 1;
    this._params = props.navigation.getParam(
      ArticlesScreen.PARAMS_DATA_SOURCE,
      { id: "", url: "", name: "", description: "", category: "" }
    );
    this._newsAPI = new NewsAPI(Tokes.newsAPI);
    this._scrollYAnimated = new Animated.Value(0);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      [ArticlesScreen.PARAMS_SEARCH_VALUE]: this.state.search,
      [ArticlesScreen.PARAMS_ONCHANGE_SEARCH]: this.callbackOnChangeSearch,
      [ArticlesScreen.PARAMS_ONCLEAR_SEARCH]: this.callbackOnClearSearch
    });

    // this.getListArticles();
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

  onScrollFetchData = () => {
    this.getListArticles(true);
  };

  getListArticles = async (isScrollToBottom = false, isSearch = false) => {
    try {
      if (isSearch) {
        this._page = 1;
      }

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
                  onRefresh={this.getListArticles}
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
