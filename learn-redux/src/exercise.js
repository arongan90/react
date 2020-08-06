import { createStore } from "redux";

// 초기 상태 정의
const initialState = {
  counter: 0,
  text: "",
  list: [],
};

// 액션 타입 정의(주로 대문자로 작성)
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const CHANGE_TEXT = "CHANGE_TEXT";
const ADD_TO_LIST = "ADD_TO_LIST";

// 액션 생성함수 정의(주로 camelCase로 작성)
const increase = () => ({
  type: "INCREASE",
});
const decrease = () => ({
  type: DECREASE,
});
const changeText = (text) => ({
  type: CHANGE_TEXT,
});
const addToList = (item) => ({
  type: ADD_TO_LIST,
});

// 리듀서 만들기
// 액션 생성함수들을 통해 만들어진 객체들을 참조하여 새로운 상태를 만드는 함수
// 불변성을 꼭 지켜줘야 된다!
function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text,
      };
    case ADD_TO_LIST:
      return {
        ...state,
        list: state.list.concat(action.item),
      };
    default:
      return state;
  }
}

// 스토어 만들기
const store = createStore(reducer);
console.log(store.getState()); // 현재 store의 상태 조회

// 스토어 안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
const listener = () => {
  const state = store.getState();
  console.log(state);
  console.log("구독");
};

const unsubcribe = store.subscribe(listener);
// unsubscribe(); 구독 해제 할때 사용

// 액션들을 디스패치
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText("안녕하세요"));
store.dispatch(addToList({ id: 1, text: "와우" }));

// window.store = store;
// window.unsubcribe = unsubcribe;
