import styled from 'styled-components';
import Color from '../const/Color';

export const Btn = styled.button`
  display: inline-block;
  text-align: center;
  text-decoration: none;
  border-radius: 200px;
  min-width: 120px;
  padding: 8px;
  white-space: nowrap;
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
  color: white;
  font-size: 16px;
  &:disabled {
    cursor: not-allowed;
  }
  border-color: ${Color.ACCENT};
  background-color: ${Color.ACCENT};
  &:hover {
    background-color: ${({ disabled }) => !disabled && Color.ACCENT_HOVER};
  }
`;
