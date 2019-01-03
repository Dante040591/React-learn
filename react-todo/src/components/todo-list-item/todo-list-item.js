import React, { Component } from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {

  state = {
    done: false,
    important: false
  };

  onMarkDone = () => {
    this.setState ((state) => {
      return {
        done: !this.state.done
      }
    });
  };

  onMarkImportant = () => {
    this.setState((state) => {
      return {
        important: !this.state.important
      }
    });
  };

  render() {
    const { label } = this.props;

    const { done, important } = this.state;
    let classes = 'todo-list-item';
    if (done) {
      classes += ' done';
    }

    if(important) {
      classes += ' important';
    }
  
    return (
      <span className={classes}>
        <span
          className="todo-list-item-label"
          onClick={this.onMarkDone}>
          {label}
        </span>
  
        <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={this.onMarkImportant}>
          <i className="fa fa-exclamation" />
        </button>
  
        <button type="button"
                className="btn btn-outline-danger btn-sm float-right">
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}

