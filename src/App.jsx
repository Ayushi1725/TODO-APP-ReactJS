import React, { useState, useEffect } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('Saving to localStorage:', todos);
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    // New todo and add it to the list
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    
    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id, text) => {
    // Only allow editing if the todo is not completed
    const todo = todos.find(t => t.id === id);
    if (todo && !todo.completed) {
      setEditingId(id);
      setEditValue(text);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editValue.trim() === '') return;
    
    setTodos(todos.map(todo => 
      todo.id === editingId ? { ...todo, text: editValue } : todo
    ));
    
    setEditingId(null);
    setEditValue('');
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    
    // If we're toggling to completed and we're currently editing this item, cancel the edit
    if (editingId === id) {
      const todo = todos.find(t => t.id === id);
      if (todo && !todo.completed) {
        setEditingId(null);
        setEditValue('');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">To-Do List</h1>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none"
          >
            Add
          </button>
        </div>
      </form>
      
      <ul className="space-y-2">
        {todos.map(todo => (
          <li 
            key={todo.id} 
            className="border border-gray-200 rounded p-3 flex items-center justify-between"
          >
            {editingId === todo.id ? (
              <form onSubmit={handleUpdate} className="flex-grow flex">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-grow p-1 border border-gray-300 rounded mr-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600 focus:outline-none"
                >
                  Save
                </button>
              </form>
            ) : (
              <>
                <div className="flex items-center flex-grow">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                    className="mr-3"
                  />
                  <span className={`flex-grow ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(todo.id, todo.text)}
                    className={`${todo.completed ? 'text-gray-300 cursor-not-allowed' : 'text-blue-500 hover:text-blue-700'} mr-2 focus:outline-none`}
                    disabled={todo.completed}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No tasks yet. Add a task to get started!</p>
      )}
    </div>
  );
}

export default TodoApp;