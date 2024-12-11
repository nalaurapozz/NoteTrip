import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const Input = ({
  style,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}) => (
  <TextInput
    style={[styles.textInput, style]}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
  />
);

export default Input;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#eee",
    height: 45,
    margin: 10,
    borderWidth: 1,
    borderRadius: 20,
    padding: 12,
    fontSize: 24,
  },
});
