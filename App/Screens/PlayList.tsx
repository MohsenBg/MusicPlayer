import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PlayList = () => {
  return (
    <View style={styles.Container}>
      <Text>PlayList</Text>
    </View>
  );
};

export default PlayList;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
