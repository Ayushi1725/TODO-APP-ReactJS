import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { TodoProvider } from './contexts/TodoContext';

function TodoApp() {
  return (
    <TodoProvider>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">To-Do List</h1>
        <TodoForm/>
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default TodoApp;