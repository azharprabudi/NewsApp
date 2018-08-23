import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { CachedImage } from "react-native-img-cache";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    marginVertical: 8,
    height: 140
  },
  image: {
    width: 90,
    height: 90,
    marginRight: -10,
    zIndex: 10,
    borderRadius: 5
  },
  wrapperContent: {
    flex: 1,
    flexWrap: "wrap",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.2)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    height: "100%",
    backgroundColor: "white",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 14,
    color: "black",
    fontWeight: "700"
  },
  labelDescription: {
    fontSize: 12,
    lineHeight: 15
  },
  labelInformation: {
    fontSize: 10,
    lineHeight: 15
  }
});

const SectionArticle = props => (
  <TouchableWithoutFeedback onPress={props.onPress}>
    <View style={styles.wrapper}>
      <CachedImage
        mutable={true}
        style={styles.image}
        resizeMode={"cover"}
        source={{ uri: props.urlToImage }}
      />
      <View style={styles.wrapperContent}>
        <View>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.labelInformation}>{`${props.author} - ${
            props.publishedAt
          }`}</Text>
        </View>
        <Text style={styles.labelDescription}>
          {`${props.description.substr(0, 90)}...`}
        </Text>
        <Text style={styles.labelInformation}>Tap to read more</Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

SectionArticle.propTypes = {
  urlToImage: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default SectionArticle;
