import React from "react";
import { StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { Paper, Text } from "react-native-paper";
import { CachedImage } from "react-native-img-cache";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  wrapper: {
    width: 120,
    height: 130,
    marginRight: 5,
    marginVertical: 8,
    backgroundColor: "white",
    flexDirection: "column",
    elevation: 4,
    borderRadius: 5,
    marginRight: 8
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 90,
    marginBottom: 5
  },
  title: {
    fontSize: 12,
    color: "black",
    fontWeight: "700",
    alignSelf: "center",
    textAlign: "center"
  },
  subtitle: {
    fontSize: 8,
    color: "rgba(0,0,0,0.5)",
    alignSelf: "center",
    textAlign: "center"
  }
});

const SectionSource = props => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <Paper style={styles.wrapper}>
        <CachedImage
          component={Image}
          source={{
            uri: `http://icon-locator.herokuapp.com/icon?url=${
              props.url
            }&amp;size=70..120..200`
          }}
          resizeMode={"cover"}
          style={styles.image}
          mutable={true}
        />
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.subtitle}>{props.url}</Text>
      </Paper>
    </TouchableWithoutFeedback>
  );
};

SectionSource.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default SectionSource;
