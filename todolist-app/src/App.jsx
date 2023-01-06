import React, { Component } from 'react';
import './App.css';
import TodolistsContainer from './components/TodolistsContainer';

class App extends Component {
  render() {
    return (
      <div className='mainContainer'>
        <div className='topHeading'>
          <h1>A Simple To-Do List App</h1>
        </div>
        <TodolistsContainer />
      </div>
    );
  }
}

export default App;
