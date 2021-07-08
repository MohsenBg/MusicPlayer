import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import color from "../misc/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.APP_BG,
  },
});

const Screen = ({ children }: any) => {
  return <View style={styles.container}>{children}</View>;
};

export default Screen;
