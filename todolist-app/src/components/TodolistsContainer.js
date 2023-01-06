import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';

class TodolistsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todolists: [],
    };
  }

  componentDidMount() {
    this.loadTodolists();
  }

  loadTodolists() {
    axios.get('/api/version1/todolists').then((res) => {
      this.setState({ todolists: res.data });
    });
    // .catch((error) => console.log(error));
  }

  newTodolist = (e) => {
    if (e.key === 'Enter' && !(e.target.value === '')) {
      axios
        .post('/api/version1/todolists', {
          todolist: { title: e.target.value },
        })
        .then((res) => {
          const todolists = update(this.state.todolists, {
            $splice: [[0, 0, res.data]],
          });

          this.setState({
            todolists: todolists,
            inputValue: '',
          });
        })
        .catch((error) => console.log(error));
    }
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  modifyTodolist = (e, id) => {
    axios
      .put(`/api/version1/todolists/${id}`, {
        todolist: { done: e.target.checked },
      })
      .then((res) => {
        const todolistIndex = this.state.todolists.findIndex(
          (x) => x.id === res.data.id
        );
        const todolists = update(this.state.todolists, {
          [todolistIndex]: { $set: res.data },
        });
        this.setState({
          todlists: todlists,
        });
      })
      .catch((error) => console.log(error));
  };

  removeTodolist = (id) => {
    axios
      .delete(`/api/version1/todolists/${id}`)
      .then((res) => {
        const todolistIndex = this.state.todolists.findIndex(
          (x) => x.id === id
        );
        const todolists = update(this.state.todolists, {
          $splice: [[todolistIndex, 1]],
        });
        this.setState({
          todolists: todolists,
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <div className='taskContainer'>
          <input
            className='newTask'
            type='text'
            placeholder='Input a New Task and Press Enter'
            maxLength='75'
            onKeyPress={this.newTodolist}
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </div>
        <div className='wrapItems'>
          <ul className='listItems'>
            {this.state.todolists.map((todolist) => (
              <li className='item' key={todolist.id}>
                <input
                  className='itemCheckbox'
                  type='checkbox'
                  checked={todolist.done}
                  onChange={(e) => this.modifyTodolist(e, todolist.id)}
                />
                <label className='itemDisplay'>{todolist.title}</label>
                <span
                  className='removeItemButton'
                  onClick={(e) => this.removeTodolist(todolist.id)}
                >
                  x
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TodolistsContainer;
