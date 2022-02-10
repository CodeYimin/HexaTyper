import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";

interface BinaryInputProps {
  size: number;
  onChange: (value: string, resetValue: () => void) => void;
}

export default function BinaryInput({
  size,
  onChange,
}: BinaryInputProps): ReactElement {
  const [inputValue, setInputValue] = useState<string>("");
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  useEffect(() => {
    setFocusedIndex(inputValue.length);
    onChange(inputValue, resetInputValue);
  }, [inputValue, onChange]);

  function resetInputValue() {
    setInputValue("");
  }

  function handleBitInput(event: React.KeyboardEvent<HTMLInputElement>) {
    const code = event.code;

    if (code === "Backspace") {
      // Remove last element
      setInputValue(inputValue.slice(0, -1));
      return;
    }

    if (!["Digit0", "Digit1"].includes(code) || inputValue.length >= size) {
      return;
    }

    // Code has to be "Digit0" or "Digit1", so actual number is at the last index, after "Digit"
    setInputValue(inputValue + code.at(-1));
  }

  return (
    <RootContainer>
      {new Array(size).fill(0).map((_, index) => (
        <BitInputContainer key={index}>
          <BitInput
            onKeyDown={handleBitInput}
            value={inputValue[index] !== undefined ? inputValue[index] : ""}
            readOnly
            autoFocus
          />
          <BitInputUnderline focused={index === focusedIndex} />
        </BitInputContainer>
      ))}
    </RootContainer>
  );
}

const RootContainer = styled.div`
  width: max-content;
  margin: auto;
`;

const BitInputContainer = styled.div`
  display: inline;
  position: relative;
`;

const BitInputUnderline = styled.div<{ focused: boolean }>`
  background-color: black;
  position: absolute;
  width: 80%;
  height: 20%;
  left: 0;
  right: 0;
  margin: 0 auto;

  &::after {
    content: "";
    background-color: green;
    position: absolute;
    width: ${(props) => (props.focused ? 100 : 0)}%;
    height: 100%;

    left: 0;
    right: 0;
    margin: 0 auto;

    transition: width 0.25s;
  }
`;

const BitInput = styled.input`
  font-size: 3rem;
  width: 5rem;
  height: 5rem;
  text-align: center;

  caret-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }
`;
