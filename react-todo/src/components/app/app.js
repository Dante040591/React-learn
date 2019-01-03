import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';

import './app.css';

export default class App extends Component {
  state = {
    todoData: [
      { label: 'Drink Coffee', important: false, id: 1 },
      { label: 'Make Awesome App', important: true, id: 2 },
      { label: 'Have a lunch', important: false, id: 3 }
    ]
  }

  deleteItem = (id) => {
    this.setState((state) => {
      const newState = this.state;
      const newTodoData = newState.todoData;
      const idx = newTodoData.findIndex((el) => el.id === id);
      newTodoData.splice(idx, 1);

      return {
        todoData: newTodoData
      }
    });
  }

  addItemHandler = (text) => {

    const id = Math.round(Math.random() * 100 );
    const newEl = {
      label: text,
      important: false,
      id: id
    }
    
    this.setState((state) => {
      const newState = this.state;
      const newTodoData = newState.todoData;
      newTodoData.push(newEl);

      return {
        todoData: newTodoData
      }

    }); 
  }

  render () {
    return (
        <div className="todo-app">
          <AppHeader toDo={1} done={3} />
          <div className="top-panel d-flex">
            <SearchPanel />
            <ItemStatusFilter />
          </div>

          <TodoList 
            todos={ this.state.todoData } 
            onDeleted={ this.deleteItem }/>
          
          <AddItem addItemHandler={this.addItemHandler}/>
        </div>
      );
  }
};