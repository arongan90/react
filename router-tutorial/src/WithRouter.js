import React from "react";
import { withRouter } from "react-router-dom";

function WithRouter({ location, match, history }) {
  // router를 사용하지 않는 곳에서 location, match, history를 사용 할 때
  return (
    <div>
      <h4>location</h4>
      <textarea value={JSON.stringify(location, null, 2)} readOnly />
      <h4>match</h4>
      <textarea value={JSON.stringify(match, null, 2)} readOnly />
      <button onClick={() => history.goBack()}>뒤로가기</button>
    </div>
  );
}

export default withRouter(WithRouter);
