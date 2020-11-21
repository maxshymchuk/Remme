import React, {useEffect, useState} from 'react';
import styles from './note.module.scss';
import {Intervals, NoteStatus, NoteType} from "../../../types";
import {useDispatch} from "react-redux";
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import {changeNote, removeNote} from "../../../store/store";
import {getDateTime} from "../../../utils";
import moment from 'moment';

export function Note(props: NoteType) {

  const {id, text, color, expired} = props;

  const [timer, setTimer] = useState<Date>();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isTimeOver()) {
      completeNote();
      return;
    }
    const interval = createInterval(isLastMinutes() ? Intervals.SECOND : Intervals.MINUTE);
    return () => clearInterval(interval);
  }, []);

  const completeNote = () => {
    dispatch(changeNote({
      ...props,
      status: NoteStatus.Completed
    }));
  }

  const deleteNote = () => {
    dispatch(removeNote(id));
  }

  const isTimeOver = () => {
    return -moment().diff(expired) <= Intervals.SECOND;
  }

  const isLastMinute = () => {
    return -moment().diff(expired) < Intervals.MINUTE;
  }

  const isLastMinutes = (ratio = 2) => {
    return -moment().diff(expired) < ratio * Intervals.MINUTE;
  }

  const createInterval = (period: Intervals) => {
    let interval = setInterval(() => {
      setTimer(new Date());
      if (isLastMinutes() && period != Intervals.SECOND) {
        clearInterval(interval);
        interval = createInterval(Intervals.SECOND);
      }
      if (isTimeOver()) {
        clearInterval(interval);
        completeNote();
      }
    }, period);
    return interval;
  }

  const handleDelete = () => {
    deleteNote();
  }

  const handleNoteDate = () => {
    return getDateTime(expired, isLastMinute() ? 'sec' : 'y.m.d.h.min').join(' ');
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
              {handleNoteDate()}
            </Typography>
          )}
        <Button size="small" color="secondary" variant="outlined" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
