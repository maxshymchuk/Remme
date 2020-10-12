import React from 'react';
import './styles/app.scss';
import {Controls} from "./components/Controls/Controls";
import {Notes} from "./components/Notes/Notes";
import {Fab} from "@material-ui/core";
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';

function App() {

  const handleClick = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  return (
      <main className="container">
        <Controls />
        <Notes />
        <Fab className="upper" color="primary" onClick={handleClick}>
          <ArrowUpwardOutlinedIcon />
        </Fab>
      </main>
  );
}

export default App;
