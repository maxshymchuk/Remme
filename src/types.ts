import {addNote, removeNote} from "./store/store";

export type AppState = {
    notes: Note[];
};

export type Actions =
    | ReturnType<typeof addNote>
    | ReturnType<typeof removeNote>;

export enum NoteStatus {
    Waiting,
    Completed
}

export enum NoteType {
    Usual,
    Important
}

export type Note = {
    id: string,
    text: string,
    endTime: number,
    type: NoteType,
    status: NoteStatus,
    color: string
}

export enum ActionTypes {
    ADD_NOTE,
    REMOVE_NOTE
}