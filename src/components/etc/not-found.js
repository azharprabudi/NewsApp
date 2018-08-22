import React from "react";
import CachedImage from "react-native-img-cache";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignSelf: "stretch"
  }
});

const NotFound = () => (
  <CachedImage
    mutate={false}
    style={styles.image}
    resizeMode={"contain"}
    source={require("../../../assets/404.jpg")}
  />
);
