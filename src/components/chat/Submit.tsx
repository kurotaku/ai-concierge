import styled from "styled-components"
import Color from "../const/Color"

const SubmitBtn = styled.button`
  flex: 0 0 auto;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  min-width: 80px;
  padding: 8px;
  white-space: nowrap;
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
  color: white;
  font-size: 16px;
  &:disabled {
    cursor: not-allowed;
    background: #ccc;
    border-color: #ccc;
  }
  border-color: ${Color.ACCENT};
  background-color: ${Color.ACCENT};
  &:hover {
    background-color: ${({ disabled }) => !disabled && Color.ACCENT_HOVER};
  }
`

const Submit = ({ children, ...props }) => {
  return (
    <SubmitBtn {...props}>
      {children}
    </SubmitBtn>
  )
}

export default Submit