import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post';
import { getPost, clearPost } from '../modules/posts';

function PostContainer({ postId }) {
  const { data, loading, error } = useSelector(state => state.posts.post);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (data) return; // 데이터가 있으면 재로딩 방지 코드(1)
    dispatch(getPost(postId));
    return () => {
      dispatch(clearPost());
    };
  }, [postId, dispatch]);

  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <div>
      <Post post={data} />
    </div>
  );
}

export default PostContainer;
