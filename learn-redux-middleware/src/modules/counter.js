import { put, delay, takeEvery, takeLatest } from 'redux-saga/effects';

const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const INCREASE_ASYNC = 'INCREASE_ASYNC';
const DECREASE_ASYNC = 'DECREASE_ASYNC';

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

function* increaseSaga() {
  yield delay(1000); // 1초를 기다림
  yield put(increase()); // 액션을 디스패치
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga); // takeEvery는 액션을 디스패치
  yield takeLatest(DECREASE_ASYNC, decreaseSaga); // takeLatest는 마지막 요청만 디스패치
}

// redux-thunk 로 구현
// export const increaseAsync = () => dispatch => {
//   setTimeout(() => dispatch(increase()), 1000);
// };

// export const decreaseAsync = () => dispatch => {
//   setTimeout(() => dispatch(decrease()), 1000);
// };

const initailState = 0;

export default function counter(state = initailState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
