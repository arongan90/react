import React from "react";
import qs from "qs";

const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const detail = query.detail === "true";

  return (
    <div>
      <h3>소개</h3>
      <p>리액트 라우터 기초 실습 페이지 테스트 입니다.</p>
      {detail && <p> detail 값이 true일 때만 화면에 나타남..</p>}
    </div>
  );
};

export default About;
