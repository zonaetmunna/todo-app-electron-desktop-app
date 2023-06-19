import { ChangeEvent, useState } from 'react';

const Todo = () => {
    const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [editTodo, setEditTodo] = useState<{ id: number | null; text: string }>({ id: null, text: '' });
  
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setNewTodo(event.target.value);
    };
  
    const handleAddTodo = () => {
      if (newTodo.trim() !== '') {
        const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
        const newTodoItem = { id: newId, text: newTodo, completed: false };
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
      }
    };
  
    const handleEditTodo = (id: number, text: string) => {
      setEditTodo({
        id,
        text
      });
    };
  
    const handleUpdateTodo = () => {
      if (editTodo.id !== null && editTodo.text.trim() !== '') {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === editTodo.id ? { ...todo, text: editTodo.text } : todo
          )
        );
        setEditTodo({
          id: null,
          text: ''
        });
      }
    };
  
    const handleDeleteTodo = (id: number) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };
  
    const handleToggleComplete = (id: number) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">ADD TODO</h1>
        <div className="flex">
          <input
            type="text"
            value={newTodo}
            onChange={handleInputChange}
            className="py-2 px-4 rounded-l-lg border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white focus:outline-none"
            placeholder="Add a new todo..."
          />
          <button
            onClick={handleAddTodo}
            className="py-2 px-4 rounded-r-lg border-t border-b border-r text-gray-800 border-gray-200 bg-blue-500 hover:bg-blue-600 focus:outline-none"
          >
            Add
          </button>
        </div>
        <ul className="mt-4 list-none">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`py-2 px-4 mb-2 rounded-lg bg-white shadow-md flex justify-between list-none ${
                todo.completed ? 'line-through' : ''
              }`}
            >
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  className="mr-2"
                />
                <span>{todo.text}</span>
              </label>
              <div>
                {editTodo.id === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editTodo.text}
                      onChange={(e) =>                    setEditTodo({ id: editTodo.id, text: e.target.value })}
                      className="py-1 px-2 border border-gray-300 rounded-lg"
                    />
                    <div>
                      <button
                        onClick={handleUpdateTodo}
                        className="ml-2 text-green-500 hover:text-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditTodo({ id: null, text: '' })}
                        className="ml-2 text-red-500 hover:text-red-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <button
                        onClick={() => handleEditTodo(todo.id, todo.text)}
                        className="ml-2 text-blue-500 hover:text-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="ml-2 text-red-500 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Todo