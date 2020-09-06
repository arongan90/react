import React from 'react';
import CounterContainer from './containers/CounterContainer';
import PostPage from './pages/PostPage';
import PostListPage from './pages/PostListPage';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Route path="/" component={PostListPage} exact />
      <Route path="/:id" component={PostPage} />
    </div>
  );
}

export default App;
