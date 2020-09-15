import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer, { rootSaga } from './modules';
// import myLogger from './middlewares/myLogger';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const customHistory = createBrowserHistory(); // 사가 미들웨어 만들기

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      sagaMiddleware, // 사가 미들웨어 적용
      reduxThunk.withExtraArgument({ history: customHistory }),
      logger
    )
  )
);
sagaMiddleware.run(rootSaga); // 루트 사가를 실행
// 주의: 스토어 생성이 된 다음에 위 코드를 실행해야 됨

ReactDOM.render(
  <React.StrictMode>
    <Router history={customHistory}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
