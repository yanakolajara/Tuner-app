import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import logo from './media/record.png'
import { Songs } from './Songs/Songs';
import { Song } from './Song/Song';
import { New } from './New/New';
import { Edit } from './Edit/Edit';
import { Error } from './Error/Error';
import { useState } from 'react';

function App() {
  const navigate = useNavigate()
  const homePage = () => navigate('/songs')
  const newPage = () => navigate('/songs/new')
  return (
        <div className="App">
          <nav id="topNav">
            <img src={logo} />
            <h1>Tuner</h1>
            <button
            id="newButton"
            onClick={() => newPage()}
            >New</button>
            <button
            onClick={() => homePage()}
            >Songs</button>
          </nav>
          <Routes>
            <Route path='/songs' element={<Songs/>}/>
            <Route path='/songs/:id' element={<Song/>}/>
            <Route path='/songs/new' element={<New/>}/>
            <Route path='/songs/:id/edit' element={<Edit/>}/>
            <Route path='*' element={<Error/>}/>
          </Routes>
        </div>
  );
}

export default App;
