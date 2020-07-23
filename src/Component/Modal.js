import React from "react";
import { View, StyleSheet } from "react-native";

export default function Modal({ children, visible }) {
  return visible? <View style={styles.modal}>{children}</View> : null;
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0, 
    bottom: 0,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(117, 117, 117, 0.7)",
  } 
});
