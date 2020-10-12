import React, {useState} from 'react';
import styles from './notes.module.scss';
import {AppState, NoteType} from "../../types";
import { Note } from "./Note/Note";
import {useSelector} from "react-redux";
import {Paper, Typography} from "@material-ui/core";
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import ReorderOutlinedIcon from '@material-ui/icons/ReorderOutlined';

enum View {
  List = "List",
  Grid = "Grid"
}

export function Notes() {

  const [view, setView] = useState(View.List);

  const notes: NoteType[] = useSelector(
    (state: AppState) => state.notes
  );

  const handleView = (value: string) => {
    setView(View[value as View]);
  }

  return (
    <Paper variant="outlined" className={styles.notes}>
      <section className={styles.settings}>
        <Typography variant="h4">
          Remme
        </Typography>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(e, value) => handleView(value)}
        >
          <ToggleButton value="List">
            <ReorderOutlinedIcon />
          </ToggleButton>
          <ToggleButton value="Grid">
            <AppsOutlinedIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </section>
      <section
        className={view === View.List ? styles.list : styles.grid}
        style={{display: notes.length ? "flex" : "none"}}
      >
        {notes.map(note => <Note key={note.id} {...note} />)}
      </section>
    </Paper>
  );
}
