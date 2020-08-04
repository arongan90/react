import React from "react";

function NotFoundPage({ location }) {
  return (
    <div>
      <h1 style={{ color: "red", background: "black" }}>
        페이지를 찾을 수 없습니다.
      </h1>
      <p>{location.pathname}</p>
    </div>
  );
}

export default NotFoundPage;
