import React from 'react';

function CreateUser({ username, email, onChange, onCreate }) {
  return (
    <div>
      <input
        placeholder="계정명"
        name="username"
        value={username}
        onChange={onChange}
      />
      <input
        placeholder="이메일"
        name="email"
        value={email}
        onChange={onChange}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default React.memo(CreateUser);
