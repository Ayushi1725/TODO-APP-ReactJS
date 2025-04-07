import React from 'react';
import TodoItem from './TodoItem'
import { useTodoContext } from '../contexts/TodoContext';

const TodoList = () => {
  const { todos } = useTodoContext();

  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No tasks yet. Add a task to get started!</p>
      )}
    </ul>
  );
};

export default TodoList;