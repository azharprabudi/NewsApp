import React from "react";
import Paper from "react-native-paper";
import { StyleSheet, Dimensions } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "48%",
    marginRight: 8,
    marginTop: 8,
    height: Dimensions.get("screen").height * 0.3,
    elevation: 3
  }
});

const SectionSource = props => (
  <Paper style={styles.wrapper}>
    <Image
      source={{
        uri: `https://icon-locator.herokuapp.com/icon?url=${
          props.url
        }&amp;size=70..120..200`
      }}
    />
  </Paper>
);

export default SectionSource;
