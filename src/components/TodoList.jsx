import React, { useState } from "react";

const TodoList = ({ id, todo, modifyTodo, removeTodo }) => {
  const [editTodo, setEditTodo] = useState(false);
  const [modifiedTitle, setModifiedTitle] = useState(todo);

  const modifyTodoMode = () => {
    setEditTodo(true);
  };

  const modifyReadTodo = () => {
    setModifiedTitle(todo);
    setEditTodo(false);
  };

  const handleModifyTodo = async () => {
    await modifyTodo(id, modifiedTitle);
    setEditTodo(false);
  };

  return (
    <li className="p-2 border border-gray-300 mb-2">
      <span>
        {editTodo ? (
          <>
            <input
              type="text"
              placeholder="수정할 할일"
              value={modifiedTitle}
              onChange={(e) => setModifiedTitle(e.target.value)}
              className="w-48 p-2"
            />

            <button
              onClick={handleModifyTodo}
              className="bg-fuchsia-600 text-white p-1 rounded mx-2"
            >
              수정완료
            </button>
            <button
              onClick={modifyReadTodo}
              className="bg-fuchsia-600 text-white p-1 rounded"
            >
              수정취소
            </button>
          </>
        ) : (
          <div className="flex items-center">
            {todo}
              <button
                className="bg-fuchsia-600 text-white p-1 rounded ml-auto"
                onClick={modifyTodoMode}
              >
                수정
              </button>
              <button
                className="bg-fuchsia-600 text-white p-1 rounded ml-2"
                onClick={() => removeTodo(id)}
              >
                삭제
              </button>
          </div>
        )}
      </span>
    </li>
  );
};

export default TodoList;