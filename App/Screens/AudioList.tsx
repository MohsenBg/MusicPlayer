import React, { Component } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Audio } from "expo-av";
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from "recyclerlistview";
import AudioListItem from "../Components/AudioListItem";
import OptionModels from "../Components/OptionModels";
import Screen from "../Components/Screen";
import { play, pause, resume, PlayNext } from "../misc/AudioController";
import { Dispatch } from "redux";
import {
  play_Back_Obj,
  Sound_Obj,
  current_Audio,
  current_Index,
  is_Playing,
  PLAY_BACK_DURATION,
  PLAY_BACK_POSITION,
} from "../Redux/SelectedAudios/ActionSelectedAudios";
import { storeAudioForNextOpening } from "../misc/helper";
import AsyncStore from "@react-native-async-storage/async-storage";
import { initialState } from "../Redux/Store";

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

interface playBackStatus {
  androidImplementation: string;
  didJustFinish: boolean;
  durationMillis: number;
  isBuffering: boolean;
  isLoaded: boolean;
  isLooping: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  playableDurationMillis: number;
  positionMillis: number;
  progressUpdateIntervalMillis: number;
  rate: number;
  shouldCorrectPitch: boolean;
  shouldPlay: boolean;
  uri: string;
  volume: number;
}

type Props = {
  //all audios files
  audios: any;

  //selectedAudio data
  playBackObj: any;
  soundObj: any;
  currentAudio: any;
  isPlaying: any;
  currentIndex: any;

  //Dispatch selectedAudio data
  DispatchPlayBackObj: any;
  DispatchSoundObj: any;
  DispatchCurrentAudio: any;
  DispatchIsPlaying: any;
  DispatchCurrentIndex: any;

  //Dispatch selectedAudio duration
  DispatchPlayBackDuration: any;
  DispatchPlayBackPosition: any;

  currentItem: any;
};

type State = {
  dataProvider: any;
  optionModelVisible: boolean;
  activeListItem: any;
  Audios: any;
};

class AudioList extends React.Component<Props, State> {
  currentItem: {};
  constructor(props: Props) {
    super(props);
    this.state = {
      dataProvider: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
        this.props.audios
      ),
      optionModelVisible: false,
      activeListItem: null,
      Audios: this.props.audios,
    };
    this.currentItem = {};
  }

  onPlayBackStatusUpdate = async (playBackStatus: playBackStatus | any) => {
    const {
      audios,
      playBackObj,
      currentIndex,
      DispatchSoundObj,
      DispatchCurrentAudio,
      DispatchIsPlaying,
      DispatchCurrentIndex,
      DispatchPlayBackDuration,
      DispatchPlayBackPosition,
    } = this.props;

    if (playBackStatus.isPlaying && playBackStatus.isLoaded) {
      DispatchPlayBackPosition(playBackStatus.positionMillis);
      DispatchPlayBackDuration(playBackStatus.durationMillis);
    }
    if (playBackStatus.didJustFinish) {
      const NextAudioIndex = currentIndex + 1;
      // last audio playing
      if (audios.length <= NextAudioIndex) {
        const audio = audios[0];
        const status = await PlayNext(playBackObj, audio.uri);
        await storeAudioForNextOpening(status, 0);
        DispatchSoundObj(status);
        DispatchCurrentAudio(audio);
        DispatchIsPlaying(true);
        DispatchCurrentIndex(0);
      }
      // other audio play except last audio
      else {
        const audio = audios[NextAudioIndex];
        const status = await PlayNext(playBackObj, audio.uri);
        await storeAudioForNextOpening(status, NextAudioIndex);
        DispatchSoundObj(status);
        DispatchCurrentAudio(audio);
        DispatchIsPlaying(true);
        DispatchCurrentIndex(currentIndex + 1);
      }
    }
  };

  handleAudioPress = async (AudioSource: string, Id: string, data: any) => {
    const {
      playBackObj,
      soundObj,
      currentAudio,
      DispatchPlayBackObj,
      DispatchSoundObj,
      DispatchCurrentAudio,
      DispatchIsPlaying,
      DispatchCurrentIndex,
    } = this.props;

    // playing audio for first time.
    if (soundObj === null) {
      const playbackObj = new Audio.Sound();
      const status = await play(playbackObj, AudioSource);
      const index = this.state.Audios.indexOf(data);
      await DispatchPlayBackObj(playbackObj);
      await DispatchSoundObj(status);
      await DispatchCurrentAudio(data);
      await DispatchIsPlaying(true);
      await DispatchCurrentIndex(index);
      playbackObj.setOnPlaybackStatusUpdate(this.onPlayBackStatusUpdate);
      return await storeAudioForNextOpening(data, index);
    }
    //fix bug
    if (soundObj !== null) {
      //pause
      if (soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === Id) {
        const status = await pause(playBackObj);
        DispatchPlayBackObj(playBackObj);
        DispatchSoundObj(status);
        DispatchCurrentAudio(data);
        DispatchIsPlaying(false);
      }
      //resume audio
      if (soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === Id) {
        const status = await resume(playBackObj);
        DispatchPlayBackObj(playBackObj);
        DispatchSoundObj(status);
        DispatchCurrentAudio(data);
        DispatchIsPlaying(true);
      }

      //select another audio
      if (soundObj.isLoaded && currentAudio.id !== Id) {
        const status = await PlayNext(playBackObj, AudioSource);
        const index = this.state.Audios.indexOf(data);
        DispatchPlayBackObj(playBackObj);
        DispatchSoundObj(status);
        DispatchCurrentAudio(data);
        DispatchIsPlaying(true);
        DispatchCurrentIndex(index);
        playBackObj.setOnPlaybackStatusUpdate(this.onPlayBackStatusUpdate);
        return await storeAudioForNextOpening(data, index);
      }
    }
  };

  layoutProvider = new LayoutProvider(
    (index) => {
      return index;
    },
    (type, dim) => {
      dim.width = Dimensions.get("window").width;
      dim.height = 80;
    }
  );

  rowRenderer = (type: any, data: Audios, index: any, extendedProps: any) => {
    const { filename, duration, uri, id } = data;
    return (
      <AudioListItem
        activeListItem={this.props.currentIndex === index}
        isPlaying={extendedProps.isPlaying}
        title={filename}
        duration={duration}
        OnAudioPress={() => this.handleAudioPress(uri, id, data)}
        onOptionPress={() => {
          this.currentItem = data;
          this.setState({ ...this.state, optionModelVisible: true });
        }}
      />
    );
  };

  loadPreviousAudio = async () => {
    const {
      audios,
      playBackObj,
      soundObj,
      currentAudio,
      isPlaying,
      currentIndex,
      DispatchPlayBackObj,
      DispatchSoundObj,
      DispatchCurrentAudio,
      DispatchIsPlaying,
      DispatchCurrentIndex,
      DispatchPlayBackDuration,
    } = this.props;

    let PreviousAudio: any = await AsyncStore.getItem("PreviousAudio");
    let CurrentAudio;
    let CurrentIndex;
    if (PreviousAudio === null) {
      CurrentAudio = audios[0];
      CurrentIndex = 0;
      DispatchCurrentAudio(CurrentAudio);
      DispatchIsPlaying(false);
      DispatchCurrentIndex(CurrentIndex);
    } else {
      PreviousAudio = JSON.parse(PreviousAudio);
      CurrentAudio = PreviousAudio.audio.id;
      CurrentIndex = PreviousAudio.index;
      DispatchCurrentAudio(PreviousAudio.audio);
      DispatchIsPlaying(false);
      DispatchCurrentIndex(CurrentIndex);
      DispatchPlayBackDuration(PreviousAudio.audio.duration);
    }
  };

  componentDidMount() {
    let update = false;
    if (!update) {
      this.loadPreviousAudio();
      update = true;
    }
  }

  render() {
    return (
      <Screen>
        {this.state.dataProvider !== "" && (
          <RecyclerListView
            dataProvider={this.state.dataProvider}
            layoutProvider={this.layoutProvider}
            rowRenderer={this.rowRenderer}
            extendedState={{ isPlaying: this.props.isPlaying }}
          />
        )}
        <OptionModels
          onPlayPress={() => console.log("onPlayPress")}
          onPlayListPress={() => console.log("onPlayListPress")}
          currentItem={this.currentItem}
          onClose={() =>
            this.setState({ ...this.state, optionModelVisible: false })
          }
          visible={this.state.optionModelVisible}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  MineMap: {
    backgroundColor: "black",
    marginTop: 30,
  },
  AudioList: {
    color: "white",
    padding: 20,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 5,
    borderWidth: 3,
    borderColor: "red",
  },
});

const mapStateToProps = (state: initialState) => {
  return {
    audios: state.Audio.Audios,
    playBackObj: state.SelectedAudio.playBackObj,
    soundObj: state.SelectedAudio.soundObj,
    currentAudio: state.SelectedAudio.currentAudio,
    isPlaying: state.SelectedAudio.isPlaying,
    currentIndex: state.SelectedAudio.currentIndex,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    DispatchPlayBackObj: (playBack_obj: any) =>
      dispatch(play_Back_Obj(playBack_obj)),

    DispatchSoundObj: (soundObj: any) => dispatch(Sound_Obj(soundObj)),

    DispatchIsPlaying: (isPlaying: any) => dispatch(is_Playing(isPlaying)),

    DispatchCurrentAudio: (currentAudio: any) =>
      dispatch(current_Audio(currentAudio)),

    DispatchCurrentIndex: (currentIndex: any) =>
      dispatch(current_Index(currentIndex)),

    DispatchPlayBackPosition: (PlayBackPosition: any) =>
      dispatch(PLAY_BACK_POSITION(PlayBackPosition)),

    DispatchPlayBackDuration: (playBackDuration: any) =>
      dispatch(PLAY_BACK_DURATION(playBackDuration)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)<any>(AudioList);
