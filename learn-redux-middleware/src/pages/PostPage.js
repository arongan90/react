import React from 'react';
import PostContainer from '../containers/PostContainer';

function PostPage({ match }) {
  const { id } = match.params; // URL파라미터 조회하기
  return (
    <div>
      <PostContainer postId={parseInt(id, 10)} />
    </div>
  );
}

export default PostPage;
