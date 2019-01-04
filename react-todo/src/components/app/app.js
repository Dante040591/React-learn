import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';

import './app.css';

export default class App extends Component {

  maxId = 1;

  state = {
    todoData: [
      this.createTodoItem('Wake up'),
      this.createTodoItem('Drink coffee'),
      this.createTodoItem('Learn React')
    ]
  }

  createTodoItem(text) {
    return {
      label: text,
      important: false,
      done: false, 
      id: this.maxId++
    }
  }


  deleteItem = (id) => {
    this.setState((prevState) => {
      //const newTodoData = prevState.todoData;
      const idx = prevState.todoData.findIndex((el) => el.id === id);
      prevState.todoData.splice(idx, 1);
      return {
        todoData: prevState.todoData
      }
    });
  }

  addItemHandler = (text) => {
    this.setState((prevState) => {
      const newTodoData = prevState.todoData;
      const newEl = this.createTodoItem(text);
      newTodoData.push(newEl);

      return {
        todoData: newTodoData
      }
    }); 
  }

  onToggleDone = (id) => {
    this.setState((prevState) => {
      const newTodoData = prevState.todoData;
      const idx = newTodoData.findIndex((el) => el.id === id);
      const oldItem = newTodoData[idx];
      const newItem = {...oldItem, done: !oldItem.done};
      newTodoData.splice(idx, 1, newItem);

      return {
        todoData: newTodoData
      }
    });
  }

  onToggleImportant = (id) => {
    console.log('toggle important', id)
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
            onDeleted={ this.deleteItem }
            onToggleDone={ this.onToggleDone }
            onToggleImportant={ this.onToggleImportant }/>
          
          <AddItem addItemHandler={this.addItemHandler}/>
        </div>
      );
  }
};