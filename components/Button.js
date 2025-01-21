import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Label from "./Label";

const Button = ({ text, onPress }) => (
  <TouchableOpacity style={styles.button}
  onPress={onPress}
  >
    <Label text={text} style={{ left: 0, fontWeight: "bold" }} />
  </TouchableOpacity>
);
//teste  teste
export default Button;

const styles = StyleSheet.create({

  button: { backgroundColor: "pink",
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 12, width: 120, height: 50,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
