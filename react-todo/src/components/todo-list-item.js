import React from 'react';

const TodoListItem = ( props ) => {

    const styleItem = {
        color: props.important ? 'red' : 'black'
    };

    return <span style={styleItem}>{props.label}</span>
};

export default TodoListItem;

//OR

// const TodoListItem = ( {label, important = false} ) => {

//     const styleItem = {
//         color: important ? 'red' : 'black'
//     };

//     return <span style={styleItem}>{label}</span>
// };

// export default TodoListItem;