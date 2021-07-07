import React, { useEffect, useState } from "react";
import { Alert, View, Text } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useDispatch } from "react-redux";
import { ActionType } from "../Redux/All Audios/ActionType";

const AudioProvider = () => {
  const [errorPermission, setErrorPermission] = useState(false);

  //Start Request
  useEffect(() => {
    getPermission();
  });

  const UpdateDispatch = useDispatch();

  //permissionAlert
  const permissionAlert = () => {
    Alert.alert("Permission Required", "This app need audio File!", [
      {
        text: "go for Access",
        onPress: () => getPermission(),
      },
      {
        text: "Cancel",
        onPress: () => permissionAlert(),
      },
    ]);
  };

  // get  PermissionAlert
  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      getAudioFile();
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();

      if (status === "denied" && canAskAgain) {
        // display user we need Access to you audio files
        permissionAlert();
      }

      if (status === "granted") {
        getAudioFile();
      }
      if (status === "granted" && !canAskAgain) {
        setErrorPermission(true);
      }
    }
  };

  //get Audio Files
  const getAudioFile = async () => {
    let media = await MediaLibrary.getAssetsAsync({});
    media = await MediaLibrary.getAssetsAsync({
      first: media.totalCount,
      mediaType: "audio",
      sortBy: "default",
    });
    UpdateDispatch({
      type: ActionType.STORE_AUDIO,
      payload: media.assets,
    });
  };

  return (
    <View>
      {errorPermission && (
        <Text style={{ color: "red", fontSize: 25 }}>
          It's Look Like you didn't Accept permission
        </Text>
      )}
    </View>
  );
};

export default AudioProvider;
