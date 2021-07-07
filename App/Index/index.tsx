import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "../Navigation/AppNavigation";
import AudioProvider from "../Context/AudioProvider";
import { useSelector } from "react-redux";
import { initialState } from "../Redux/Store";

export default function Index() {
  const Audios = useSelector((state: initialState) => state.Audio.Audios);
  return (
    <>
      <AudioProvider />
      {Audios !== "" && (
        <>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
