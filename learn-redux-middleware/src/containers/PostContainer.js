import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post';
import { getPost, clearPost, goToHome, printState } from '../modules/posts';
import { reducerUtils } from '../lib/asyncUtils';

function PostContainer({ postId }) {
  const { data, loading, error } =
    useSelector(state => state.posts.post[postId]) || reducerUtils.initial();
  // 아예 데이터가 존재하지 않을 때가 있으므로, 비구조화 할당이 오류나지 않도록
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) return; // 데이터가 있으면 재로딩 방지 코드(1)
    dispatch(getPost(postId));
    // return () => {
    //   dispatch(clearPost());
    // };
  }, [postId, data, dispatch]);

  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <div>
      <button onClick={() => dispatch(goToHome())}>홈으로 이동</button>
      {/* <button onClick={() => dispatch(printState())}>상태 출력</button> */}
      <Post post={data} />
    </div>
  );
}

export default PostContainer;
