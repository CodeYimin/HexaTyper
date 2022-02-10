import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { binaryStringToHexa, hexaDecimals } from "../util/binary";
import BinaryInput from "./BinaryInput";

interface HexaTyperProps {
  onCharacterCompleted: (success: boolean) => void;
}

export default function HexaTyper({
  onCharacterCompleted,
}: HexaTyperProps): ReactElement {
  const [content, setContent] = useState<string>("");
  const [completed, setCompleted] = useState<boolean[]>([]);
  const [currentHexa, setCurrentHexa] = useState<string>("");
  const [currentRow, setCurrentRow] = useState<number>(0);
  const charactersPerRow = 10;
  const maxRows = 3;

  useEffect(() => {
    addNewContent(charactersPerRow * 5);
  }, []);

  useEffect(() => {
    setCurrentHexa(content[completed.length]);
    if (completed.length > currentRow * charactersPerRow) {
      setCurrentRow(Math.floor(completed.length / charactersPerRow));
    }
  }, [completed, content, currentRow]);

  useEffect(() => {
    onCharacterCompleted(completed[completed.length - 1]);
    addNewContent(1);
  }, [completed]);

  function addNewContent(amount: number): void {
    let newContent = "";
    for (let i = 0; i < amount; i++) {
      newContent +=
        hexaDecimals[Math.floor(Math.random() * hexaDecimals.length)];
    }
    setContent((content) => content + newContent);
  }

  function renderCharacters(): ReactElement[] {
    const offset = Math.max((currentRow - 1) * charactersPerRow, 0);

    const elements: ReactElement[] = [];
    for (let i = offset; i < charactersPerRow * maxRows + offset; i++) {
      elements.push(
        <Character
          key={i}
          completed={completed[i]}
          failed={completed[i] === false}
        >
          {content[i]}
        </Character>
      );
    }
    return elements;
  }

  return (
    <RootContainer>
      <CharactersContainer charactersPerRow={charactersPerRow}>
        {renderCharacters()}
      </CharactersContainer>
      <BinaryInput
        size={4}
        onChange={(value, resetValue) => {
          if (value.length === 4) {
            resetValue();
            const inputHexa = binaryStringToHexa(value);
            setCompleted([...completed, inputHexa === currentHexa]);
          }
        }}
      />
    </RootContainer>
  );
}

const RootContainer = styled.div``;

const CharactersContainer = styled.div<{ charactersPerRow: number }>`
  width: 50rem;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(${(props) => props.charactersPerRow}, 1fr);
`;

const Character = styled.span<{ completed: boolean; failed: boolean }>`
  color: ${(props) =>
    props.failed ? "red" : props.completed ? "green" : "black"};

  font-size: 2rem;
`;
