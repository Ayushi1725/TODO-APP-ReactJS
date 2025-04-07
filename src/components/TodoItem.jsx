import React from 'react';
import { useTodoContext } from '../contexts/TodoContext';

const TodoItem = ({ todo }) => {
  const { 
    editingId, 
    editValue, 
    setEditValue,
    handleDelete, 
    handleEdit, 
    handleUpdate, 
    handleToggleComplete 
  } = useTodoContext();

  return (
    <li className="border border-gray-200 rounded p-3 flex items-center justify-between">
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
  );
};

export default TodoItem;