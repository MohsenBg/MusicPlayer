import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import color from "../misc/color";
import { Ionicons } from "@expo/vector-icons";
const getThumbnailText = (FileName: string) => {
  return FileName[0];
};

const convertTime = (minutes: any) => {
  if (minutes) {
    const hrs = minutes / 60;
    const minute = hrs.toString().split(".")[0];
    const percent = parseInt(hrs.toString().split(".")[1].slice(0, 2));
    const sec = Math.ceil((60 * percent) / 100);
    if (parseInt(minute) < 10 && sec < 10) {
      return `0${minute}:0${sec}`;
    }
    if (parseInt(minute) < 10) {
      return `0${minute}:${sec}`;
    }
    if (sec < 10) {
      return `${minute}:${sec}`;
    }
    return `${minute}:${sec}`;
  }
};

const renderPlayPauseIcon = (isPlaying: boolean) => {
  if (isPlaying)
    return <Ionicons name="pause" size={24} color={color.ACTIVE_FONT} />;
  else return <Ionicons name="play" size={20} color={color.ACTIVE_FONT} />;
};

const AudioListItem: React.FC<any> = ({
  title,
  duration,
  onOptionPress,
  OnAudioPress,
  isPlaying,
  activeListItem,
}) => {
  return (
    <View>
      {activeListItem ? (
        <ImageBackground
          source={require("../../assets/gradientImage/LightPrepel.png")}
          style={styles.ImageBackground}
          imageStyle={{ borderRadius: 50 }}
        >
          <View
            style={activeListItem ? styles.ActiveContainer : styles.container}
          >
            <TouchableWithoutFeedback onPress={OnAudioPress}>
              <View style={styles.leftContainer}>
                <View
                  style={[
                    styles.thumbnail,
                    {
                      backgroundColor: activeListItem
                        ? color.ACTIVE_BG
                        : color.FONT_LIGHT,
                    },
                  ]}
                >
                  <Text style={styles.thumbnailText}>
                    {activeListItem
                      ? renderPlayPauseIcon(isPlaying)
                      : getThumbnailText(title)}
                  </Text>
                </View>
                <View style={styles.titleContainer}>
                  <Text numberOfLines={1} style={styles.title}>
                    {title}
                  </Text>
                  <Text style={styles.timeText}>{convertTime(duration)}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.rightContainer}>
              <Entypo
                onPress={onOptionPress}
                name="dots-three-horizontal"
                size={20}
                color="white"
                style={{ padding: 10 }}
              />
            </View>
          </View>
        </ImageBackground>
      ) : (
        <View
          style={activeListItem ? styles.ActiveContainer : styles.container}
        >
          <TouchableWithoutFeedback onPress={OnAudioPress}>
            <View style={styles.leftContainer}>
              <View
                style={[
                  styles.thumbnail,
                  {
                    backgroundColor: activeListItem
                      ? color.ACTIVE_BG
                      : color.FONT_LIGHT,
                  },
                ]}
              >
                <Text style={styles.thumbnailText}>
                  {activeListItem
                    ? renderPlayPauseIcon(isPlaying)
                    : getThumbnailText(title)}
                </Text>
              </View>
              <View style={styles.titleContainer}>
                <Text numberOfLines={1} style={styles.title}>
                  {title}
                </Text>
                <Text style={styles.timeText}>{convertTime(duration)}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.rightContainer}>
            <Entypo
              onPress={onOptionPress}
              name="dots-three-horizontal"
              size={20}
              color="cyan"
              style={{ padding: 10 }}
            />
          </View>
        </View>
      )}
    </View>
  );
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  ImageBackground: {
    width: width - 35,
    height: 70,
    marginTop: 20,
    paddingLeft: 25,
    paddingBottom: 10,
    flexDirection: "row",
    alignSelf: "center",
  },
  container: {
    marginTop: 20,
    paddingTop: 10,
    flexDirection: "row",
    alignSelf: "center",
    width: width - 80,
    paddingBottom: 20,
  },
  ActiveContainer: {
    marginTop: 20,
    paddingTop: 10,
    flexDirection: "row",
    alignSelf: "center",
    width: width - 80,
    paddingBottom: 20,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rightContainer: {
    flexBasis: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnail: {
    height: 50,
    flexBasis: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: color.FONT_LIGHT,
    borderRadius: 50,
  },
  thumbnailText: {
    fontSize: 22,
    fontWeight: "bold",
    color: color.FONT,
  },
  titleContainer: {
    width: width - 180,
    paddingLeft: 16,
  },
  title: {
    fontSize: 16,
    color: "white",
  },

  timeText: {
    fontSize: 14,
    color: color.FONT_LIGHT,
  },
});

export default AudioListItem;
