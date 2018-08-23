import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Colors from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    color: Colors.grey
  }
});

const NotFound = () => (
  <View style={styles.container}>
    <Icon name={"md-refresh"} color={Colors.grey} size={48} />
    <Text
      style={styles.label}
    >{`Ups .. Not Found !!\nclear your search value`}</Text>
  </View>
);

export default NotFound;
