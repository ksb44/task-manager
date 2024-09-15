import React from 'react';
function Card({todo,edit,handleToggle}) {
    return (
        <div>

        {todo.msg}
        <input type='checkbox' checked={todo.complete} 
        onChange={handleToggle} />
        <button onClick={edit}>edit</button>
        </div>
    )
}
export default Card;