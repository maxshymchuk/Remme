import React from 'react';
import styles from './note.module.scss';
import {NoteType, NoteStatus} from "../../../types";
import {useDispatch} from "react-redux";
import {Button, Card, CardActions, CardContent, Chip, Typography} from "@material-ui/core";
import AccessAlarmOutlinedIcon from '@material-ui/icons/AccessAlarmOutlined';
import AlarmOnOutlinedIcon from '@material-ui/icons/AlarmOnOutlined';
import {removeNote} from "../../../store/store";
import {getDateTime} from "../../../utils";

export function Note(props: NoteType) {

  const {id, text, color, endTime, status} = props;

  const dispatch = useDispatch();

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
          <Chip
            style={{margin: "0 8px"}}
            icon={<AlarmOnOutlinedIcon />}
            label={"Completed"}
            color="primary"/>
        ) : (
          <Chip
            style={{margin: "0 8px"}}
            icon={<AccessAlarmOutlinedIcon />}
            label={getDateTime(endTime)}
            color="default"
          />
        )}
        <Button size="small" color="secondary" onClick={() => handleDelete(id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
