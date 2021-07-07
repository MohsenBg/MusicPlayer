import { ActionType } from "./ActionType";

interface StoreAudio {
  type: ActionType.STORE_AUDIO;
  payload: any;
}

export type Actions = StoreAudio;
