import React, { useEffect } from "react";

function HistorySample({ history }) {
  const goBack = () => {
    history.goBack();
  };
  const goHome = () => {
    history.push("/"); // push 특정경로로 이동
  };
  const replaceToHome = () => {
    history.replace("/"); // 기록을 남기지 않고 이동
  };

  useEffect(() => {
    console.log(history);
    const unblock = history.block("정말 떠나실 건가요?");
    console.log(typeof unblock);
    return () => {
      unblock();
    };
  }, [history]);
  return (
    <div>
      <button onClick={goBack}>뒤로가기</button>
      <button onClick={goHome}>홈으로</button>
      <button onClick={replaceToHome}>홈으로 (replace)</button>
    </div>
  );
}

export default HistorySample;
