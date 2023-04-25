import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./todo.css";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://jsonplaceholder.typicode.com/todos', { title, description })
            .then(response => {
                setTodos([...todos, response.data]);
                setTitle('');
                setDescription('');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        axios.get(`https://jsonplaceholder.typicode.com/todos?q=${query}`)
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleFilter = (event) => {
        const status = event.target.value;
        const url = status === "" ? "https://jsonplaceholder.typicode.com/todos?_limit=10" : `https://jsonplaceholder.typicode.com/todos?completed=${status}&_limit=10`;
        axios
          .get(url)
          .then((response) => {
            setTodos(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      

    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)} />
                <button type="submit">Add Todo</button>
            </form>
            <input type="text" placeholder="Search" onChange={handleSearch} />
            <select onChange={handleFilter}>
                <option value="">All</option>
                <option value="true">Completed</option>
                <option value="false">Not completed</option>
            </select>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.title} - {todo.completed ? 'Completed' : 'Not completed'}
                        <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
