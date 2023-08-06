import styled from 'styled-components';

const Input = styled.input`
  border-radius: 8px;
  width: 100%;
  max-width: 320px;
  padding: 8px;
  border-width: 2px;
  border-style: solid;
  border-color: #ccc;
  &:focus {
    border-color: #999;
  }
`;

// コンポーネントの定義時ではなく、使用時に要素を指定
export const TextArea = styled(Input)`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  resize: none;
  outline: none;
  background: transparent;
  max-width: 100%;
  background-color: white;
`;