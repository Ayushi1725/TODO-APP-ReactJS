import React, { createContext, useState, useContext, useEffect } from 'react';

const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);



// Provider Component
export const TodoProvider = ({ children }) => {
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

  const value = {
    todos,
    inputValue,
    setInputValue,
    editingId,
    editValue,
    setEditValue,
    handleSubmit,
    handleDelete,
    handleEdit,
    handleUpdate,
    handleToggleComplete
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};