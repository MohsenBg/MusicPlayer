import { combineReducers } from "redux";
import { AudioReducer } from "./All Audios/Reducer";
import ReducerSelectedAudios from "./SelectedAudios/ReducerSelectedAudios";

const MainReducer = combineReducers({
  Audio: AudioReducer,
  SelectedAudio: ReducerSelectedAudios,
});

export default MainReducer;
