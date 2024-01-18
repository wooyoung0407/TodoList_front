import React from "react";

function TodoWrite({ todoTitle, setTodoTitle, addTodo }) {
  const handleAddTodo = async () => {

    await addTodo();
    setTodoTitle("");
  };

  return (
    <div className="flex items-center mb-4">
      <input
        className="flex-grow p-2 border border-gray-300"
        type="text"
        placeholder="새 할일을 입력해주세요"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <button
        className="bg-green-500 text-white p-2 ml-2 rounded"
        onClick={handleAddTodo}
      >
        할일추가
      </button>
    </div>
  );
}

export default TodoWrite;