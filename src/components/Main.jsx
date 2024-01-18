import React, { useState, useEffect } from "react";
import TodoWrite from "./TodoWrite";
import TodoList from "./TodoList";

function Main() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todo/todos");
      const data = await response.json();
      setTodos(data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (todoTitle.trim().length === 0) return;

    try {
      await fetch("http://localhost:5000/todo/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: todoTitle.trim(),
          perform_date: new Date().toISOString(),
        }),
      });
      fetchTodos();

      setTodoTitle("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const modifyTodo = async (id, title) => {
    try {
      await fetch(`http://localhost:5000/todo/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: title.trim(),
          perform_date: new Date().toISOString(),
        }),
      });

      await fetchTodos();
    } catch (error) {
      console.error("Error modifying todo:", error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todo/todos/${id}`, {
        method: "DELETE",
      });

      fetchTodos();
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <TodoWrite
        todoTitle={todoTitle}
        setTodoTitle={setTodoTitle}
        addTodo={addTodo}
      />
      <ul>
        {todos.map((todo, index) => (
          <TodoList
            key={todo.id}
            id={todo.id}
            todo={`${index + 1}. ${todo.content}`}
            modifyTodo={modifyTodo}
            removeTodo={removeTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default Main;
