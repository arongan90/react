import React, { useState, useRef } from 'react';
import Button from './components/Button';
import './App.scss';
import InputSample from './InputSample';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const [users, setUsers] = useState([
    {
      id: 1,
      username: '박동한',
      email: 'arongan90@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: '신민주',
      email: 'zoomandu@naver.com',
      active: false,
    },
    {
      id: 3,
      username: '테스트',
      email: 'test@test.com',
      active: false,
    },
  ]);
  const { username, email } = inputs;
  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers([...users, user]);
    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  };
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id));
  };
  const onToggle = id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user,
      ),
    );
  };

  return (
    <>
      <div className="App">
        <div className="buttons">
          <Button size="large">BUTTON</Button>
          <Button>BUTTON</Button>
          <Button size="small">BUTTON</Button>
        </div>
        <div className="buttons">
          <Button color="gray" size="large">
            BUTTON
          </Button>
          <Button color="gray">BUTTON</Button>
          <Button color="gray" size="small">
            BUTTON
          </Button>
        </div>
        <div className="buttons">
          <Button color="pink" size="large">
            BUTTON
          </Button>
          <Button color="pink">BUTTON</Button>
          <Button color="pink" size="small">
            BUTTON
          </Button>
        </div>
        <div className="buttons">
          <Button size="large" outline>
            BUTTON
          </Button>
          <Button color="gray" outline>
            BUTTON
          </Button>
          <Button color="pink" size="small" outline>
            BUTTON
          </Button>
        </div>
        <div className="buttons">
          <Button size="large" fullWidth>
            BUTTON
          </Button>
          <Button size="large" color="gray" fullWidth>
            BUTTON
          </Button>
          <Button size="large" color="pink" fullWidth>
            BUTTON
          </Button>
        </div>
        <div className="input">
          <InputSample />
        </div>
        <div className="userList">
          <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
        </div>
        <div className="createUser">
          <CreateUser
            username={username}
            email={email}
            onCreate={onCreate}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
}

export default App;
