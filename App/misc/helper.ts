import AsyncStore from "@react-native-async-storage/async-storage";
export const storeAudioForNextOpening = async (audio: any, index: any) => {
  await AsyncStore.setItem(
    "PreviousAudio",
    JSON.stringify({
      audio,
      index,
    })
  );
};
