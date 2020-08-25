import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
  const users = [
    {
      id: 1,
      username: '박동한',
      email: 'arongan90@gmail.com',
    },
    {
      id: 2,
      username: '신민주',
      email: 'zoomandu@naver.com',
    },
    {
      id: 3,
      username: '테스트',
      email: 'test@test.com',
    },
  ];

  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default UserList;
