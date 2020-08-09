import React, { useState } from "react";

// 컴포넌트 최적화를 위하여 React.memo 사용
const TodoItem = React.memo(function TodoIetm({ onToggle, todo }) {
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
});

const TodoList = React.memo(function ({ todos, onToggle }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
});

function Todos({ onToggle, todos, onCreate }) {
  // 리덕스를 사용한다고 해서 모든 상태를 리덕스에서 관리해야 하는것은 아니다
  // 로컬에서 useState로 관리해도 가능
  const [text, setText] = useState();
  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault(); // submit 이벤트 발생 시 새로고침 방지
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

export default React.memo(Todos);
