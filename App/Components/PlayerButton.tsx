import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import color from "../misc/color";

const PlayerButton: React.FC<any> = (props) => {
  const { iconType, size = 40, IconColor = "white", onPress } = props;

  const getIconName = (Type: any) => {
    switch (Type) {
      case "PLAY":
        return "pausecircle";
      // <AntDesign name="play" size={24} color="black" />;

      case "PAUSE":
        return "play";
      //<AntDesign name="pausecircle" size={24} color="black" />;

      case "NEXT":
        return "forward";
      // <AntDesign name="forward" size={24} color="black" />;

      case "PREV":
        return "banckward";
      //<AntDesign name="banckward" size={24} color="black" />;
    }
  };

  return (
    <AntDesign
      name={getIconName(iconType)}
      size={iconType === "PLAY" || iconType === "PAUSE" ? 70 : size}
      color={
        iconType === "PLAY" || iconType === "PAUSE"
          ? "rgba(80, 143, 179,10)"
          : IconColor
      }
      {...props}
      onPress={onPress}
    />
  );
};

export default PlayerButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
