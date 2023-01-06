import React, { Component } from 'react';
import axios from 'axios';

class TodolistsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todolists: [],
    };
  }

  loadTodolists() {
    axios
      .get('/api/version1/todolists')
      .then((res) => {
        this.setState({ todolists: res.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.loadTodolists();
  }

  render() {
    return (
      <div>
        <div className='taskContainer'>
          <input
            className='newTask'
            type='text'
            placeholder='Input a New Task and Press Enter'
            maxLength='75'
            onKeyPress={this.createTodo}
          />
        </div>
        <div className='wrapItems'>
          <ul className='listItems'>
            {this.state.todolists.map((todolist) => {
              return (
                <li className='item' todolist={todolist} key={todolist.id}>
                  <input className='itemCheckbox' type='checkbox' />
                  <label className='itemDisplay'>{todolist.title}</label>
                  <span className='removeItemButton'>x</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default TodolistsContainer;
