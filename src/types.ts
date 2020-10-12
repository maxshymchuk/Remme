import {addNote, changeNote, removeNote} from "./store/store";

export type AppState = {
    notes: NoteType[];
};

export type Actions =
  | ReturnType<typeof addNote>
  | ReturnType<typeof removeNote>
  | ReturnType<typeof changeNote>;

export enum NoteStatus {
    Waiting,
    Completed
}

export type NoteType = {
    id: string,
    text: string,
    endTime: number,
    status: NoteStatus,
    color: string
}

export enum ActionTypes {
    ADD_NOTE,
    REMOVE_NOTE,
    CHANGE_NOTE
}