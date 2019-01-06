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
    ], 
    term: '',
    filter: 'active'
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
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProps(todoData, id, 'done')
      }
    })
  }

  //определяет свойство, которое нужно добавить/удалить (prop)
  toggleProps(arr, id, prop) {
      const newTodoData = arr
      const idx = newTodoData.findIndex((el) => el.id === id)
      const oldItem = newTodoData[idx];
      const newItem = {...oldItem, [prop]: !oldItem[prop]}
      newTodoData.splice(idx, 1, newItem)
      return newTodoData
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
         todoData: this.toggleProps(todoData, id, 'important')
      }
    })
  }

  search(items, term) {
    if (term.length === 0) {
      return items
    }
    return items.filter((item)=> {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }

  onSearchChange = (term) => {
    this.setState({term})
  }

  onChangeFilter = (filter) => {
    this.setState({filter})
  }

  filter(items, filter) {
    switch (filter){
      case 'all': 
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  render () {
    //отобрать те элементы у которых el.done == true и получить их количество (length)
    //filter не изменяет state , так как возвращает новый массив
    const doneCount = this.state.todoData.filter((el) => el.done).length
    const todoCount = this.state.todoData.length - doneCount
    const visibleItem = this.filter( this.search(this.state.todoData, this.state.term), this.state.filter) 
    

    return (
        <div className="todo-app">
          <AppHeader toDo={todoCount} done={doneCount} />
          <div className="top-panel d-flex">
            <SearchPanel 
              onSearchChange = {this.onSearchChange}/>
            <ItemStatusFilter filter={this.state.filter} onChangeFilter = {this.onChangeFilter} />
          </div>

          <TodoList 
            todos={ visibleItem } 
            onDeleted={ this.deleteItem }
            onToggleDone={ this.onToggleDone }
            onToggleImportant={ this.onToggleImportant }/>
          
          <AddItem 
            addItemHandler={this.addItemHandler}/>
        </div>
      );
  }
};