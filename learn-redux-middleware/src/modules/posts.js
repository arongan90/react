import * as postAPI from '../api/posts';
import {
  createPromiseThunk,
  reducerUtils,
  handleAsyncActions,
  createPromiseThunkById,
  handleAsyncActionsById,
  createPromiseSaga,
  createPromiseSagaById,
} from '../lib/asyncUtils';
import { takeEvery, getContext, select } from 'redux-saga/effects';

// 액션타입
// 포스트 여러개 조회
const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

// 포스트 하나만 조회
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

const CLEAR_POST = 'CLEAR_POST'; // 컴포넌트 언마운트 시 상태를 비우는 액션타입
const GO_TO_HOME = 'GO_TO_HOME';
const PRINT_STATE = 'PRINT_STATE';

// api 를 요청 하는 thunk 함수
// export const getPosts = createPromiseThunk(GET_POSTS, postAPI.getPosts);
// export const getPost = createPromiseThunkById(GET_POST, postAPI.getPostById);
// 3번째 인자를 사용하면 withExtraArgument 에서 너어준 값들을 사용 가능
// export const goToHome = () => (dispatch, getState, { history }) => {
//   history.push('/');
// };
export const clearPost = () => ({ type: CLEAR_POST });

// ------ redux-saga 로 promise 다루기 ------
export const getPosts = () => ({ type: GET_POSTS });
export const getPost = id => ({ type: GET_POST, payload: id, meta: id }); // payload는 파라미터 용도, meta는 리듀서에서 id를 알기위한 용도
export const goToHome = () => ({ type: GO_TO_HOME });
export const printState = () => ({ type: PRINT_STATE });

const getPostsSaga = createPromiseSaga(GET_POSTS, postAPI.getPosts);
const getPostSaga = createPromiseSagaById(GET_POST, postAPI.getPostById);
function* goToHomeSaga() {
  const history = yield getContext('history');
  history.push('/');
}
function* printStateSaga() {
  const state = yield select(state => state.posts);
  console.log(state);
}
// Saga 합치기
export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
  yield takeEvery(GO_TO_HOME, goToHomeSaga);
  yield takeEvery(PRINT_STATE, printStateSaga);
}
// ------------------------------------------

// 초기 상태
const initialState = {
  posts: reducerUtils.initial(),
  post: {},
};

// 리듀서
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActionsById(GET_POST, 'post', true)(state, action);
    case CLEAR_POST:
      return {
        ...state,
        post: reducerUtils.initial(),
      };
    default:
      return state;
  }
}

// function* getPostsSaga() {
//   try {
//     // call 을 사용하면 특정 함수를 호출하고, 결과물이 반환 될 때까지 기다려줄 수 있다
//     const posts = yield call(postAPI.getPosts);
//     yield put({
//       type: GET_POSTS_SUCCESS,
//       payload: posts,
//     }); // 성공 액션 디스패치
//   } catch (e) {
//     yield put({
//       type: GET_POSTS_ERROR,
//       error: true,
//       payload: e,
//     }); // 실패 액션 디스패치
//   }
// }

// // 액션이 지니고 있는 값을 조회하고 싶다면 action을 파라미터로 받아와서 사용
// function* getPostSaga(action) {
//   const id = action.payload;
//   try {
//     const post = yield call(postAPI.getPostById, id);
//     yield put({
//       type: GET_POST_SUCCESS,
//       payload: post,
//       meta: id,
//     });
//   } catch (e) {
//     yield put({
//       type: GET_POST_ERROR,
//       error: true,
//       payload: e,
//       meta: id,
//     });
//   }
// }
