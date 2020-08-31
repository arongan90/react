import React, { useState, useRef, useMemo, useCallback } from 'react';
import Button from './components/Button';
import './App.scss';
import InputSample from './InputSample';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';

const countActiveUsers = users => {
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user => user.active).length;
};

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
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers(users => users.concat(user));
    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  }, [username, email]);
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs(inputs => ({
      ...inputs,
      [name]: value,
    }));
  }, []);
  const onRemove = useCallback(id => {
    setUsers(users => users.filter(user => user.id !== id));
  }, []);
  const onToggle = useCallback(id => {
    setUsers(users =>
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user,
      ),
    );
  }, []);
  const count = useMemo(() => countActiveUsers(users), [users]);

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
          <b>활성 사용자 수 : </b>
          {count}
        </div>
      </div>
    </>
  );
}

export default App;
