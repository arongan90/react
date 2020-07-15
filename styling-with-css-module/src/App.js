import React, { useState } from "react";
import CheckBox from "./components/CheckBox";
import styled, { css, ThemeProvider } from "styled-components";
import Button from "./components/Button";
import Dialog from "./components/Dialog";
import { RiMenu2Line } from "react-icons/ri";

const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  background: ${(props) => props.color};
  border-radius: 50%;
  ${(props) =>
    props.huge &&
    css`
      width: 10rem;
      height: 10rem;
    `}
`;
const AppBlock = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 4rem;
  border: 1px solid black;
  padding: 1rem;
`;

const palette = {
  blue: "#228be6",
  gray: "#496057",
  pink: "#f06595",
};

function App() {
  const [check, setCheck] = useState(false);
  const onChange = (e) => {
    setCheck(e.target.checked);
  };
  const [dialog, setDialog] = useState(false);
  const onClick = () => {
    setDialog(true);
  };
  const onConfirm = () => {
    console.log("확인");
    setDialog(false);
  };
  const onCancel = () => {
    console.log("취소");
    setDialog(false);
  };

  const ButtonGroup = styled.div`
    & + & {
      margin-top: 1rem;
    }
  `;
  return (
    <div>
      <CheckBox checked={check} onChange={onChange}>
        다음 약관에 모두 동의
      </CheckBox>
      <RiMenu2Line />
      <hr />
      <Circle color="black" />
      <Circle color="blue" huge />
      <hr />
      <ThemeProvider theme={{ palette }}>
        <AppBlock>
          <ButtonGroup>
            <Button size="large">BUTTON</Button>
            <Button color="gray">BUTTON</Button>
            <Button size="small" color="pink">
              BUTTON
            </Button>
          </ButtonGroup>
          <hr />
          <ButtonGroup>
            <Button outline size="large">
              BUTTON
            </Button>
            <Button outline color="gray">
              BUTTON
            </Button>
            <Button outline size="small" color="pink">
              BUTTON
            </Button>
            <hr />
            <Button fullWidth size="large">
              BUTTON
            </Button>
            <Button fullWidth size="large" color="gray">
              BUTTON
            </Button>
            <Button fullWidth size="large" color="pink" onClick={onClick}>
              삭제
            </Button>
          </ButtonGroup>
        </AppBlock>
        <Dialog
          title="정말로 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
          visible={dialog}
          onConfirm={onConfirm}
          onCancel={onCancel}
        >
          데이터를 정말로 삭제하시겠습니까?
        </Dialog>
      </ThemeProvider>
    </div>
  );
}

export default App;
