import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { initialState } from "../Redux/Store";
import color from "../misc/color";
import { ActionTypeSelectedAudios } from "../Redux/SelectedAudios/ActionTypeSelectedAudios";
import { ActionType } from "../Redux/All Audios/ActionType";

interface Audios {
  albumId: string;
  creationTime: number;
  duration: number;
  filename: string;
  height: number;
  id: string;
  mediaType: string;
  modificationTime: number;
  uri: string;
  width: number;
}

const SearchBar = () => {
  const [searchBarValue, setSearchBarValue] = useState("");
  const [dataFilter, setDataFilter] = useState<any>("");
  const audios: Array<Audios> = useSelector(
    (state: initialState) => state.Audio.Audios
  );
  const dispatch = useDispatch();

  //Filler
  const searchFilter = async (text: any) => {
    if (text) {
      const newAudio = audios.filter((item) => {
        const itemAudio = item.filename
          ? item.filename.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemAudio.indexOf(textData) > -1;
      });
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <EvilIcons
        name="search"
        size={25}
        color={color.FONT_LIGHT}
        style={styles.icon}
      />
      <TextInput
        style={styles.InputSearchBar}
        placeholder={"search"}
        placeholderTextColor={color.FONT_LIGHT}
        onChangeText={(text) => searchFilter(text)}
      />
    </View>
  );
};

const Width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  InputSearchBar: {
    fontSize: 15,
    letterSpacing: 0.2,
    width: Width - 40,
    height: 45,
    borderColor: "white",
    borderWidth: 2,
    paddingHorizontal: 40,
    borderRadius: 50,
    color: "white",
    backgroundColor: "black",
  },
  icon: {
    position: "absolute",
    zIndex: 2,
    paddingLeft: 10,
    bottom: 12,
  },
});

export default SearchBar;
