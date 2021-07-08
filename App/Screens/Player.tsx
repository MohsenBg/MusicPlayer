import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, ImageBackground } from "react-native";
import Screen from "../Components/Screen";
import { StyleSheet } from "react-native-auto-stylesheet";
import color from "../misc/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import PlayerButton from "../Components/PlayerButton";
import { useDispatch, useSelector } from "react-redux";
import { initialState } from "../Redux/Store";
import { pause, play, PlayNext, resume } from "../misc/AudioController";
import { ActionTypeSelectedAudios } from "../Redux/SelectedAudios/ActionTypeSelectedAudios";
import { Audio } from "expo-av";
import { storeAudioForNextOpening } from "../misc/helper";
import { log } from "react-native-reanimated";

const Player = () => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const dispatch = useDispatch();

  //redux Value

  const audios = useSelector((state: initialState) => state.Audio.Audios);

  const totalCount = useSelector(
    (state: initialState) => state.Audio.Audios.length
  );

  const playBackObj = useSelector(
    (state: initialState) => state.SelectedAudio.playBackObj
  );

  const soundObj = useSelector(
    (state: initialState) => state.SelectedAudio.soundObj
  );

  const isPlaying = useSelector(
    (state: initialState) => state.SelectedAudio.isPlaying
  );

  const currentIndex = useSelector(
    (state: initialState) => state.SelectedAudio.currentIndex
  );

  const currentAudio = useSelector(
    (state: initialState) => state.SelectedAudio.currentAudio
  );

  const playBackDuration = useSelector(
    (state: initialState) => state.SelectedAudio.playBackDuration
  );

  const playBackPosition = useSelector(
    (state: initialState) => state.SelectedAudio.playBackPosition
  );

  const onPlayBackStatusUpdate = useSelector(
    (state: initialState) => state.SelectedAudio.onPlayBackStatusUpdate
  );

  const millisToMinutesAndSeconds = (millis: number) => {
    if (millis !== null && millis !== undefined) {
      let Number = millis;
      if (millis.toString().includes(".")) {
        let value = millis.toString();
        Number = parseInt(value.replace(".", ""));
      }
      let minutes = Math.floor(Number / 60000);
      let seconds = ((Number % 60000) / 1000).toFixed(0);
      return minutes + ":" + (parseInt(seconds) < 10 ? "0" : "") + seconds;
    }
  };

  const calculateSeeBar = () => {
    if (playBackPosition !== null && playBackDuration !== null) {
      return playBackPosition / playBackDuration;
    } else return 0;
  };

  const handelPlayAndPause = async () => {
    // play
    if (soundObj === null) {
      const PlaybackObj = new Audio.Sound();
      const audio = currentAudio;
      const status = await play(PlaybackObj, audio.uri);
      playBackObj.setOnPlaybackStatusUpdate(onPlayBackStatusUpdate);
      dispatch({
        type: ActionTypeSelectedAudios.PLAY_BACK_OBJ,
        payload: PlaybackObj,
      });
      dispatch({ type: ActionTypeSelectedAudios.SOUND_OBJ, payload: status }),
        dispatch({
          type: ActionTypeSelectedAudios.CURRENT_AUDIO,
          payload: audio,
        }),
        dispatch({ type: ActionTypeSelectedAudios.IS_PLAYING, payload: true });
      dispatch({
        type: ActionTypeSelectedAudios.CURRENT_INDEX,
        payload: currentIndex,
      });

      return await storeAudioForNextOpening(audio, currentIndex);
    }
    //pause
    if (soundObj && soundObj.isPlaying) {
      const status = await pause(playBackObj);
      playBackObj.setOnPlaybackStatusUpdate(onPlayBackStatusUpdate);
      dispatch({ type: ActionTypeSelectedAudios.SOUND_OBJ, payload: status }),
        dispatch({ type: ActionTypeSelectedAudios.IS_PLAYING, payload: false });
    }
    //resume
    if (soundObj && !soundObj.isPlaying) {
      const status = await resume(playBackObj);
      playBackObj.setOnPlaybackStatusUpdate(onPlayBackStatusUpdate);

      dispatch({ type: ActionTypeSelectedAudios.SOUND_OBJ, payload: status }),
        dispatch({ type: ActionTypeSelectedAudios.IS_PLAYING, payload: true });
    }
  };

  const handelNext = async () => {
    const { isLoaded } = await playBackObj.getStatusAsync();
    const isLastAudio = totalCount === currentIndex + 1;
    let audio = audios[currentIndex + 1];
    let index;
    let status;

    if (!isLoaded && !isLastAudio) {
      index = currentIndex + 1;
      status = await play(playBackObj, audio.uri);
    }

    if (isLoaded && !isLastAudio) {
      index = currentIndex + 1;
      status = await PlayNext(playBackObj, audio.uri);
    }

    if (isLastAudio) {
      index = 0;
      audio = audios[0];
      status = await play(playBackObj, audio.uri);
      if (isLoaded) {
        status = await PlayNext(playBackObj, audio.uri);
      } else {
        status = await play(playBackObj, audio.uri);
      }
    }
    playBackObj.setOnPlaybackStatusUpdate(onPlayBackStatusUpdate);

    dispatch({
      type: ActionTypeSelectedAudios.PLAY_BACK_OBJ,
      payload: playBackObj,
    });
    dispatch({ type: ActionTypeSelectedAudios.SOUND_OBJ, payload: status }),
      dispatch({
        type: ActionTypeSelectedAudios.CURRENT_AUDIO,
        payload: audio,
      }),
      dispatch({ type: ActionTypeSelectedAudios.IS_PLAYING, payload: true });
    dispatch({
      type: ActionTypeSelectedAudios.CURRENT_INDEX,
      payload: index,
    });
    return await storeAudioForNextOpening(audio, index);
  };

  const handelPrevious = async () => {
    const { isLoaded } = await playBackObj.getStatusAsync();
    const isFirstAudio = currentIndex === 0;
    let audio = audios[currentIndex - 1];
    let index;
    let status;

    if (!isLoaded && !isFirstAudio) {
      index = currentIndex - 1;
      status = await play(playBackObj, audio.uri);
    }

    if (isLoaded && !isFirstAudio) {
      index = currentIndex - 1;
      status = await PlayNext(playBackObj, audio.uri);
    }

    if (isFirstAudio) {
      index = totalCount - 1;
      audio = audios[totalCount - 1];
      if (isLoaded) {
        status = await PlayNext(playBackObj, audio.uri);
      } else {
        status = await play(playBackObj, audio.uri);
      }
    }
    playBackObj.setOnPlaybackStatusUpdate(onPlayBackStatusUpdate);
    dispatch({
      type: ActionTypeSelectedAudios.PLAY_BACK_OBJ,
      payload: playBackObj,
    });
    dispatch({ type: ActionTypeSelectedAudios.SOUND_OBJ, payload: status }),
      dispatch({
        type: ActionTypeSelectedAudios.CURRENT_AUDIO,
        payload: audio,
      }),
      dispatch({ type: ActionTypeSelectedAudios.IS_PLAYING, payload: true });
    dispatch({
      type: ActionTypeSelectedAudios.CURRENT_INDEX,
      payload: index,
    });

    await storeAudioForNextOpening(audio, index);
  };

  return (
    <Screen>
      <ImageBackground
        source={require("../../assets/defultImageMusicPlayer/3.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.Container}>
          <Text style={styles.audioCount}>{`${
            currentIndex + 1
          }/${totalCount}`}</Text>
          <Text numberOfLines={1} style={styles.audioTextTitle}>
            {currentAudio.filename}
          </Text>
          <View style={styles.midBannerContainer}>
            <View>
              <MaterialCommunityIcons
                name="music-circle"
                size={Width - 50}
                color={isPlaying ? "yellow" : "white"}
              />
              <View style={styles.PlayPause}>
                <PlayerButton
                  onPress={handelPlayAndPause}
                  iconType={isPlaying ? "PLAY" : "PAUSE"}
                />
              </View>
            </View>
            <View style={styles.audioControllers}>
              <PlayerButton
                iconType="PREV"
                style={{ paddingHorizontal: 60 }}
                onPress={handelPrevious}
              />

              <PlayerButton
                iconType="NEXT"
                style={{ paddingHorizontal: 60 }}
                onPress={handelNext}
              />
            </View>
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={calculateSeeBar()}
                minimumTrackTintColor={"red"}
                maximumTrackTintColor={"white"}
                thumbTintColor="orange"
                onValueChange={(value: number) => {
                  setCurrentPosition(value * playBackPosition);
                }}
              />
            </View>
            <View style={styles.timeDurationContainer}>
              <View>
                <Text style={styles.timeDuration}>
                  {playBackPosition !== null
                    ? millisToMinutesAndSeconds(playBackPosition)
                    : "0:00"}
                </Text>
              </View>
              <View style={{ position: "absolute", right: 0 }}>
                <Text style={styles.timeDuration}>
                  {millisToMinutesAndSeconds(playBackDuration)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Screen>
  );
};

export default Player;

const Width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  audioCount: {
    textAlign: "right",
    padding: 15,
    color: color.FONT_LIGHT,
    fontSize: 14,
  },
  midBannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  audioPlayerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  audioTextTitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255,0.6)",
    padding: 15,
  },
  PlayPause: {
    backgroundColor: "white",
    borderRadius: 60,
    borderBottomColor: "orange",
    borderTopColor: "red",
    borderLeftColor: "rgb(158, 255, 255)",
    borderRightColor: "rgb(158, 255, 255)",
    borderWidth: 5,
    position: "absolute",
    bottom: -10,
    alignSelf: "center",
  },
  sliderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  slider: {
    width: Width - 60,
    height: 40,
  },
  audioControllers: {
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  timeDurationContainer: {
    flexDirection: "row",
    width: Width - 60,
  },
  timeDuration: {
    fontSize: 14,
    color: "white",
  },
});
