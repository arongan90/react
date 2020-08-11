import React from "react";
import Counter from "../components/Counter";
import { increase, decrease, setDiff } from "../modules/counter";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function CounterContainer({ number, diff, increase, decrease, setDiff }) {
  return (
    <div>
      <Counter
        number={number}
        diff={diff}
        onIncrease={increase}
        onDecrease={decrease}
        onSetDiff={setDiff}
      />
    </div>
  );
}

// mapStateToProps 는 리덕스 스토어의 상태를 조회해서 어떤 것들을 props 로 넣어줄지 정의합니다.
// 현재 리덕스 상태를 파라미터로 받아옵니다.
const mapStateToProps = (state) => ({
  number: state.counter.number,
  diff: state.counter.diff,
});

// mapDispatchToProps 는 액션을 디스패치하는 함수를 만들어서 props로 넣어줍니다.
// dispatch 를 파라미터로 받아옵니다.
const mapDispatchToProps = (dispatch) =>
  // bindActionCreators 를 사용하면, 자동으로 액션 생성 함수에 dispatch 가 감싸진 상태로 호출 할 수 있습니다.
  bindActionCreators(
    {
      increase,
      decrease,
      setDiff,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

/* 위 코드는 다음과 동일
  const enhance = connect(mapStateToProps, mapDispatchToProps);
  export defualt enhance(CounterContainer);
*/
