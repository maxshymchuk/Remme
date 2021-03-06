import {combineReducers, createStore, Store} from "redux";
import {Actions, ActionTypes, AppState, NoteType} from "../types";

export function addNote(note: NoteType) {
    return {
        type: ActionTypes.ADD_NOTE,
        payload: note,
    } as const;
}

export function removeNote(id: string) {
    return {
        type: ActionTypes.REMOVE_NOTE,
        payload: id,
    } as const;
}

export function changeNote(note: NoteType) {
    return {
        type: ActionTypes.CHANGE_NOTE,
        payload: note,
    } as const;
}

function reducer(
    state: NoteType[] = [],
    action: Actions
) {

    const storage = localStorage.getItem('notes');

    let result = storage ? JSON.parse(storage) as NoteType[] : state;

    switch (action.type) {
        case ActionTypes.ADD_NOTE:
            result = state.concat(action.payload);
            break;
        case ActionTypes.REMOVE_NOTE:
            result = state.filter(
              (note) => note.id !== action.payload
            );
            break;
        case ActionTypes.CHANGE_NOTE:
            const newState = [...state];
            newState.forEach((element, index) => {
                if (element.id === action.payload.id) {
                    newState[index] = action.payload;
                }
            });
            result = newState;
            break;
    }

    localStorage.setItem('notes', JSON.stringify(result));

    return result;
}

const rootReducer = combineReducers<AppState>({
    notes: reducer
});

export function configureStore(): Store<AppState> {
    return createStore(
        rootReducer, undefined
    );
}