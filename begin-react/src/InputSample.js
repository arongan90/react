import React, { useState, useRef } from 'react';

function InputSample() {
  const [text, setText] = useState('');
  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
  });

  const textChange = e => {
    setText(e.target.value);
  };

  const { name, nickname } = inputs;
  const nameInput = useRef();

  const onChange = e => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onReset = () => {
    setText('');
    setInputs({
      name: '',
      nickname: '',
    });
    nameInput.current.focus();
  };

  return (
    <>
      <div>
        <input onChange={textChange} value={text} ref={nameInput} />
        <button onClick={onReset}>초기화</button>
        <b>값 : </b> {text}
      </div>
      <div>
        <input
          name="name"
          onChange={onChange}
          value={name}
          placeholder="이름"
        />
        <input
          name="nickname"
          onChange={onChange}
          value={nickname}
          placeholder="닉네임"
        />
        <button onClick={onReset}>초기화</button>
        <b>{name}</b> : ({nickname})
      </div>
    </>
  );
}

export default InputSample;
