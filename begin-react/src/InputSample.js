import React, { useState } from 'react';

function InputSample() {
  const [text, setText] = useState('');
  const onChange = e => {
    setText(e.target.value);
  };
  const reset = () => {
    setText('');
  };
  return (
    <div>
      <input onChange={onChange} value={text} />
      <button onClick={reset}>초기화</button>
      <b>값 : </b> {text}
    </div>
  );
}

export default InputSample;
