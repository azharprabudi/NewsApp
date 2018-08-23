import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Colors from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const NotFound = () => (
  <View style={styles.container}>
    <Icon name={"md-refresh"} color={Colors.grey} />
    <Text>
      {`Ups .. Not Found !!\nPull from top to bottom to refresh this page`}
    </Text>
  </View>
);

export default NotFound;
