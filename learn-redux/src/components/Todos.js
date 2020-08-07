import React, { useState } from "react";

const TodoItem = function TodoIetm({ onToggle, todo }) {
  return (
    <li
      style={{
        textDecoration: todo.done ? "linethrough" : "none",
      }}
      onClick={() => onToggle(todo.id)}
    >
      {todo.text}
    </li>
  );
};

const TodoList = function ({ todos, onToggle }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
};

function Todos({ onToggle, todos, onCreate }) {
  const [text, setText] = useState();
  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    onCreate(text);
    setText("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={text}
          onChange={onChange}
          placeholder="할 일을 입력해주세요..."
        />
        <button type="submit">등록</button>
      </form>
      <TodoList onToggle={onToggle} todos={todos} />
    </div>
  );
}

export default Todos;
