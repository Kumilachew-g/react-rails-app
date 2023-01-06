import React from 'react';
import './App.css';
import TodolistsContainer from './components/TodolistsContainer';

const App = () => (
  <div className="mainContainer">
    <div className="topHeading">
      <h1>A Simple To-Do List App</h1>
    </div>
    <TodolistsContainer />
  </div>
);

export default App;
