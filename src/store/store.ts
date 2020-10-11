import {combineReducers, createStore, Store} from "redux";
import {Actions, ActionTypes, AppState, Note} from "../types";

export function addNote(note: Note) {
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

function reducer(
    state: Note[] = [],
    action: Actions
) {
    const storage = localStorage.getItem('notes');

    let result = storage ? JSON.parse(storage) as Note[] : state;

    switch (action.type) {
        case ActionTypes.ADD_NOTE:
            result = state.concat(action.payload);
            break;
        case ActionTypes.REMOVE_NOTE:
            result = state.filter(
                (note) => note.id !== action.payload
            );
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