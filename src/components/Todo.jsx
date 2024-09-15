import React, { useState } from 'react';
import Card from './Card';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [input, setInput] = useState('');

  const handleClick = () => {
    if (input.trim()) {
      let newTodo = { msg: input, complete: false };
      setTodos([...todos, newTodo]);
      setInput(''); 
    }
  };

  const handleToggle = (todo) => {
    const update = todos.map((to) =>
      to.msg === todo.msg ? { ...to, complete: !to.complete } : to
    );
    setTodos(update);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'Completed') {
      return todo.complete;
    }
    if (filter === 'Incomplete') {
      return !todo.complete;
    }
    return true;
  });

  const edit =(todo)=>{

    console.log(todos)

    setTodos(todos.filter((item,index)=>{
      if(item.msg!==todo.msg){
        return item
        }
        }))
        setInput(todo.msg)
        
  
  }
  return (
    <div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleClick}>Add</button>
      </div>

      <div>
        {filteredTodos.map((todo, index) => (
          <Card
            handleToggle={() => handleToggle(todo)}
            key={index}
            edit={()=>edit(todo)}
            todo={todo}
          />
        ))}
      </div>

      <div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option> {/* Fixed typo */}
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>
    </div>
  );
}

export default Todo;
