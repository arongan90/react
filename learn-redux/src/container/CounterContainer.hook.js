import React from "react";
import Counter from "../components/Counter";
import { increase, decrease, setDiff } from "../modules/counter";
import { connect } from "react-redux";

function CounterContainer({ number, diff, onIncrease, onDecrease, onSetDiff }) {
  return (
    <div>
      <Counter
        number={number}
        diff={diff}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onSetDiff={onSetDiff}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  number: state.counter.number,
  diff: state.counter.diff,
});

const mapDispatchToProps = (dispatch) => ({
  onIncrease: () => dispatch(increase()),
  onDecrease: () => dispatch(decrease()),
  onSetDiff: (diff) => dispatch(setDiff(diff)),
});

export default connect(mapStateToProps, mapStateToProps)(CounterContainer);

/* 위 코드는 다음과 동일
  const enhance = connect(mapStateToProps, mapDispatchToProps);
  export defualt enhance(CounterContainer);
*/
