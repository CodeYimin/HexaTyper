import React, { useState } from "react";
import styled from "styled-components";
import HexaTyper from "./components/HexaTyper";

function App() {
  const [score, setScore] = useState<number>(0);

  function handleCharacterCompleted(success: boolean): void {
    if (success) {
      setScore(score + 1);
      return;
    }

    if (score > 0) {
      setScore(score - 1);
      return;
    }
  }

  return (
    <RootContainer>
      <MainContentContainer>
        <Score>{score}</Score>
        <HexaTyper onCharacterCompleted={handleCharacterCompleted} />
      </MainContentContainer>
    </RootContainer>
  );
}

const RootContainer = styled.div`
  width: 100vw;
  height: 100vh;
  width: max-content;
  margin: auto;
`;

const MainContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Score = styled.div`
  font-size: 5rem;
  margin-bottom: 5rem;
`;

export default App;
