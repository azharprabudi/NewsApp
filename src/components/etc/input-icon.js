import React from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    justifyContent: "space-between"
  },
  input: {
    width: "87%",
    marginBottom: -8,
    justifyContent: "center",
    fontSize: 18
  }
});

const InputIcon = props => (
  <View
    style={[styles.wrapper, { borderBottomColor: props.underlineColorAndroid }]}
  >
    {Object.keys(props.iconLeft).length > 0 && <Icon {...props.iconLeft} />}
    <TextInput
      {...props.inputProps}
      value={props.value}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      returnKeyType={props.returnKeyType}
      underlineColorAndroid={"transparent"}
      onSubmitEditing={props.onSubmitEditing}
      style={[styles.input, { color: props.underlineColorAndroid }]}
      placeholderTextColor={props.underlineColorAndroid}
    />
    {props.useClearValue &&
      props.value.replace(/\s/g, "") !== "" && (
        <TouchableOpacity onPress={props.onClearValue}>
          <Icon {...props.iconClearValue} />
        </TouchableOpacity>
      )}
  </View>
);

InputIcon.propTypes = {
  value: PropTypes.any.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onClearValue: PropTypes.object,
  iconLeft: PropTypes.object,
  iconClearValue: PropTypes.object,
  onClearValue: PropTypes.func,
  inputProps: PropTypes.object
};

InputIcon.defaultProps = {
  useClearValue: false,
  placeholder: "",
  returnKeyType: "next",
  underlineColorAndroid: "rgba(0,0,0,0.5)",
  onSubmitEditing: () => {},
  iconLeft: {},
  iconClearValue: {},
  onClearValue: () => {},
  inputProps: {}
};

export default InputIcon;
