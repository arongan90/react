export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return param => dispatch => {
      dispatch({type, param});
      try {
        // 결과물의 이름을 payload로 통일시켜서 반환
        const payload = await promiseCreator(param);
        dispatch({ type: SUCCESS, payload}); // 성공
      } catch (e) {
        dispatch({ type: ERROR, payload: e, error: true}) // 실패
      }
  }
};

// 리듀서에서 사용 할 수 있는 여러 유틸 함수
export const reducerUtils = {
    initial: (initialData = null) => ({
        loading: false,
        data: initialData,
        error: null
    }),

    // 로딩중 상태. prevState의 경우엔 기본값은 null 이지만
    // 따로 값을 지정하면 null 로 바꾸지 않고 다른 값을 유지 시킬 수 있다.
    loading: (prevState = null) => ({
        loading: true,
        data: prevState,
        error: null,
    }),
    success: (payload) => ({
        loading: true,
        data: payload,
        error: null,
    }),
    error: (error) => ({
        loading: false,
        data: null,
        error: error
    })
};
