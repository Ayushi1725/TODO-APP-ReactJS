import React from 'react';
import { useTodoContext } from '../contexts/TodoContext';

const TodoForm = () => {
  const { inputValue, setInputValue, handleSubmit } = useTodoContext();

  return (
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
  );
};

export default TodoForm;