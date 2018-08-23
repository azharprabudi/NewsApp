import React from "react";
import { StyleSheet, Text } from "react-native";
import { CachedImage } from "react-native-img-cache";

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200
  }
});

const NotFound = () => (
  <React.Fragment>
    <CachedImage
      mutable={false}
      style={styles.image}
      resizeMode={"contain"}
      source={require("../../../assets/404.jpg")}
    />
  </React.Fragment>
);

export default NotFound;
