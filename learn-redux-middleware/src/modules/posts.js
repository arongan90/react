import * as postAPI from '../api/posts';
import {
  createPromiseThunk,
  reducerUtils,
  handleAsyncActions,
  createPromiseThunkById,
  handleAsyncActionsById,
} from '../lib/asyncUtils';
import { call, put, takeEvery } from 'redux-saga/effects';

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

// api 를 요청 하는 thunk 함수
// export const getPosts = createPromiseThunk(GET_POSTS, postAPI.getPosts);
// export const getPost = createPromiseThunkById(GET_POST, postAPI.getPostById);
export const clearPost = () => ({ type: CLEAR_POST });
export const goToHome = () => (dispatch, getState, { history }) => {
  history.push('/');
};

// redux-saga 로 promise 다루기
export const getPosts = () => ({ type: GET_POSTS });
export const getPost = id => ({ type: GET_POST, payload: id, meta: id });

function* getPostsSaga() {
  try {
    const posts = yield call(postAPI.getPosts);
    yield put({ type: GET_POSTS_SUCCESS, payload: posts });
  } catch (e) {
    yield put({ type: GET_POSTS_ERROR, payload: e, error: true });
  }
}

function* getPostSaga(action) {
  const id = action.payload;
  try {
    const post = yield call(postAPI.getPostById, id);
    yield put({
      type: GET_POST_SUCCESS,
      payload: post,
      meta: id,
    });
  } catch (e) {
    yield put({
      type: GET_POST_ERROR,
      payload: e,
      error: true,
    });
  }
}

export function* postSaga() {
  yield takeEvery(getPosts, getPostsSaga);
  yield takeEvery(getPost, getPostSaga);
}

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
