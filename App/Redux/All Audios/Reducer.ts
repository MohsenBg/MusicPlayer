import { ActionType } from "./ActionType";
import { Actions } from "./AudioAction";

const initialState = {
  Audios: "",
};

export const AudioReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionType.STORE_AUDIO:
      return { Audios: action.payload };
    default:
      return state;
  }
};
