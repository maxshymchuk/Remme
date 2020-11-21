import React, {useEffect, useState} from 'react';
import styles from './controls.module.scss';
import {Button, Paper, FormControl, Input, InputAdornment, InputLabel, TextField} from "@material-ui/core";
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import dateFormat from 'dateformat';
import ColorPicker from 'material-ui-color-picker';
import {NoteType, NoteStatus} from "../../types";
import uniqid from 'uniqid';
import {useDispatch} from "react-redux";
import {addNote} from "../../store/store";
import moment from 'moment';

type ControlsState = {
  text: string,
  expired: number,
  color: string
}

export function Controls() {
  const [placeholder, setPlaceholder] = useState('');
  const [state, setState] = useState<ControlsState>({
    text: '',
    expired: 0,
    color: '#FFFFFF'
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const placeholders = [
      'Buy tickets',
      'Meet Jessica',
      'Do homework',
      'Take medicine'
    ]
    const pos = Math.trunc(Math.random() * placeholders.length);
    setPlaceholder(placeholders[pos]);
  }, [])

  const handleText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    setState(state => {
      return {
        ...state, text: target.value
      }
    })
  }

  const handleTime = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const targetTime = new Date(target.value).getTime();
    setState(state => {
      return {
        ...state, expired: targetTime
      }
    })
  }

  const handleColor = (color: string) => {
    setState(state => {
      return {
        ...state, color
      }
    })
  }

  const handleClick = () => {
    const note = {
      ...state,
      id: uniqid(),
      status: moment().diff(state.expired) < 0 ? NoteStatus.Waiting : NoteStatus.Completed
    } as NoteType;
    dispatch(addNote(note));
    setState({...state, text: ''});
  }

  return (
    <Paper className={styles.controls}>
      <FormControl fullWidth >
        <InputLabel htmlFor="input-text">Note text</InputLabel>
        <Input
          id="input-text"
          value={state.text}
          placeholder={placeholder}
          startAdornment={
            <InputAdornment position="start">
              <ArrowForwardIosOutlinedIcon fontSize="small" />
            </InputAdornment>
          }
          onChange={e => handleText(e)}
        />
      </FormControl>
      <section className={styles.control_panel}>
        <section className={styles.additional}>
          <TextField
            id="date"
            label="End Time"
            type="datetime-local"
            defaultValue={dateFormat(state.expired, "yyyy-mm-dd'T'HH:MM")}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => handleTime(e)}
          />
          <section className={styles.color}>
            <InputLabel htmlFor="input-color" className={styles.color_label} style={{backgroundColor: state.color}}/>
            <ColorPicker
              className={styles.color_picker}
              id="input-color"
              name='color'
              defaultValue='#FFFFFF'
              value={state.color}
              onChange={handleColor}
            />
          </section>
        </section>
        <Button className={styles.button} variant="contained" color="primary" onClick={handleClick} disabled={!state.text}>
          Add Note
        </Button>
      </section>
    </Paper>
  );
}
