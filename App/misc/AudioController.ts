import { Audio } from "expo-av";

// play audio
export const play = async (playbackObj: any, uri: any) => {
  try {
    return await playbackObj.loadAsync({ uri }, { shouldPlay: true });
  } catch (error: any) {
    console.log("Play error: " + error.message);
  }
};

//pause audio
export const pause = async (playbackObj: any) => {
  try {
    return await playbackObj.setStatusAsync({
      shouldPlay: false,
    });
  } catch (error: any) {
    console.log("pause error: " + error.message);
  }
};

//resume audio
export const resume = async (playbackObj: any) => {
  try {
    return await playbackObj.playAsync();
  } catch (error: any) {
    console.log("resume error: " + error.message);
  }
};

//select another audio
export const PlayNext = async (playbackObj: any, uri: string) => {
  try {
    await playbackObj.stopAsync();
    await playbackObj.unloadAsync();
    return await play(playbackObj, uri);
  } catch (error: any) {
    console.log("Select Another error: " + error.message);
  }
};
