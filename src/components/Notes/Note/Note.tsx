import React, {useEffect} from 'react';
import styles from './note.module.scss';
import {AppState, NoteStatus, NoteType} from "../../../types";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import {changeNote, removeNote} from "../../../store/store";
import {getDateTime, getDelta} from "../../../utils";

export function Note(props: NoteType) {

  const {id, text, color, endTime, status} = props;

  const notes: NoteType[] = useSelector(
    (state: AppState) => state.notes
  );

  const dispatch = useDispatch();

  const checkTime = () => {
    notes.forEach(note => {
      if (note.status === NoteStatus.Waiting) {
        if (getDelta(note.endTime) <= 0) {
          const newNote = {
            ...note,
            status: NoteStatus.Completed
          }
          dispatch(changeNote(newNote));
          return true;
        }
      }
    })
    return false;
  }

  useEffect(() => {
    checkTime();
    const interval = setInterval(() => {
      if (checkTime()) {
        clearInterval(interval);
      }
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const isTimeOver = () => {
    return status === NoteStatus.Completed;
  }

  const handleDelete = (id: string) => {
    dispatch(removeNote(id));
  }

  return (
    <Card style={{borderColor: color}} className={styles.note}>
      <CardContent className={styles.content}>
        <Typography variant="h5">
          {text}
        </Typography>
      </CardContent>
      <CardActions className={styles.action}>
          {isTimeOver() ? (
            <Typography className={styles.result} color="primary" variant="subtitle2">
              Completed
            </Typography>
          ) : (
            <Typography className={styles.result} variant="subtitle2">
              {getDateTime(endTime)}
            </Typography>
          )}
        <Button size="small" color="secondary" variant="outlined" onClick={() => handleDelete(id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
