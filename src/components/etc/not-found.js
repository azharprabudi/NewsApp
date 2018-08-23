import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CachedImage } from "react-native-img-cache";

const styles = StyleSheet.create({
  image: {
    width: undefined
  }
});

const NotFound = () => (
  <View>
    <CachedImage
      mutable={false}
      style={styles.image}
      resizeMode={"contain"}
      source={require("../../../assets/404.jpg")}
    />
    <Text style={{ color: "red" }}>HELo</Text>
  </View>
);

export default NotFound;
