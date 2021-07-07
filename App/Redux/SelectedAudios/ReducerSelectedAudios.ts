import { Audio } from "expo-av";
import { ActionSelectedAudios } from "./ActionSelectedAudios";
import { ActionTypeSelectedAudios } from "./ActionTypeSelectedAudios";

interface State {
  playBackObj: any;
  soundObj: any;
  currentAudio: any;
  isPlaying: any;
  currentIndex: any;
  playBackDuration: any;
  playBackPosition: any;
}

const initialState: State = {
  playBackObj: new Audio.Sound(),
  soundObj: null,
  currentAudio: null,
  isPlaying: null,
  currentIndex: null,
  playBackDuration: null,
  playBackPosition: null,
};

export default (state = initialState, Action: ActionSelectedAudios) => {
  switch (Action.type) {
    case ActionTypeSelectedAudios.PLAY_BACK_OBJ:
      return { ...state, playBackObj: Action.payload };

    case ActionTypeSelectedAudios.SOUND_OBJ:
      return { ...state, soundObj: Action.payload };

    case ActionTypeSelectedAudios.CURRENT_AUDIO:
      return { ...state, currentAudio: Action.payload };

    case ActionTypeSelectedAudios.IS_PLAYING:
      return { ...state, isPlaying: Action.payload };

    case ActionTypeSelectedAudios.CURRENT_INDEX:
      return { ...state, currentIndex: Action.payload };

    case ActionTypeSelectedAudios.PLAY_BACK_POSITION:
      return { ...state, playBackPosition: Action.payload };

    case ActionTypeSelectedAudios.PLAY_BACK_DURATION:
      return { ...state, playBackDuration: Action.payload };

    default:
      return state;
  }
};
