import { ActionTypeSelectedAudios } from "./ActionTypeSelectedAudios";

interface playBackObj {
  type: ActionTypeSelectedAudios.PLAY_BACK_OBJ;
  payload: any;
}

export const play_Back_Obj: any = (PlayBackObj: any) => {
  return {
    type: ActionTypeSelectedAudios.PLAY_BACK_OBJ,
    payload: PlayBackObj,
  };
};

interface SoundObj {
  type: ActionTypeSelectedAudios.SOUND_OBJ;
  payload: any;
}

export const Sound_Obj: any = (SoundObj: any) => {
  return {
    type: ActionTypeSelectedAudios.SOUND_OBJ,
    payload: SoundObj,
  };
};

interface currentAudio {
  type: ActionTypeSelectedAudios.CURRENT_AUDIO;
  payload: any;
}

export const current_Audio: any = (currentAudio: any) => {
  return {
    type: ActionTypeSelectedAudios.CURRENT_AUDIO,
    payload: currentAudio,
  };
};

interface isPlaying {
  type: ActionTypeSelectedAudios.IS_PLAYING;
  payload: any;
}

export const is_Playing: any = (isPlaying: any) => {
  return {
    type: ActionTypeSelectedAudios.IS_PLAYING,
    payload: isPlaying,
  };
};

interface currentIndex {
  type: ActionTypeSelectedAudios.CURRENT_INDEX;
  payload: any;
}

export const current_Index: any = (currentIndex: any) => {
  return {
    type: ActionTypeSelectedAudios.CURRENT_INDEX,
    payload: currentIndex,
  };
};

interface PlayBackPosition {
  type: ActionTypeSelectedAudios.PLAY_BACK_POSITION;
  payload: any;
}

export const PLAY_BACK_POSITION: any = (PlayBackPosition: any) => {
  return {
    type: ActionTypeSelectedAudios.PLAY_BACK_POSITION,
    payload: PlayBackPosition,
  };
};

interface PlayBackDuration {
  type: ActionTypeSelectedAudios.PLAY_BACK_DURATION;
  payload: any;
}

export const PLAY_BACK_DURATION: any = (PlayBackDuration: any) => {
  return {
    type: ActionTypeSelectedAudios.PLAY_BACK_DURATION,
    payload: PlayBackDuration,
  };
};

export type ActionSelectedAudios =
  | playBackObj
  | SoundObj
  | currentAudio
  | isPlaying
  | currentIndex
  | PlayBackPosition
  | PlayBackDuration;
