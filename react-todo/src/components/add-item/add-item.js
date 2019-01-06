import React, { Component } from 'react';
import './add-item.css';

export default class AddItem extends Component {

    state = {
        label: ''
    }

    onChangeLabel = (event) => {
        this.setState({
            label: event.target.value
        })
    }
    onSubmit = (event) => {
        event.preventDefault()
        this.props.addItemHandler(this.state.label)
        this.setState({
            label: ''
        })
    }

    render(props) {
        return (
            <form className='form-group d-flex add-item'
                    onSubmit={this.onSubmit}>
                <input
                    type='text' 
                    placeholder='new task'
                    className='form-control search-input'
                    onChange={this.onChangeLabel}
                    value={this.state.label}/>
                <button 
                    type='button' 
                    className='btn btn-success'
                    onClick={this.onSubmit}>
                    Add item
                </button>
            </form>
        )
    }
} 