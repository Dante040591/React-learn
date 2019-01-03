import React, { Component } from 'react';
import './add-item.css';

export default class AddItem extends Component {
    render(props) {
        return (
            <div className='add-item'>
                <button 
                    type='button' 
                    className='btn btn-success'
                    onClick={() => this.props.addItemHandler('Run')}>
                    Add item
                </button>
            </div>
        )
    }
} 