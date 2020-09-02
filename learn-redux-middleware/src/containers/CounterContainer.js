import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

function CounterContainer() {
  const number = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increase());
  };
  const onDecrease = () => {
    dispatch(decrease());
  };

  return (
    <div>
      <Counter
        number={number}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
    </div>
  );
}

export default CounterContainer;
