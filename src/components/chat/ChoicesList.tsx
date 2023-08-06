import { Btn } from "../button/Button";
import styled from "styled-components";

const BtnWrap = styled.div`
  display: flex;
  &>button{
    margin: 0 8px 8px 0;
  }
`

const ChoicesList = ({ choices, onChoiceSelected }) => {
  const handleClick = (choice) => {
    onChoiceSelected(choice);
  };

  return (
    <BtnWrap>
      {choices.map((choice, index) => (
        <Btn key={index} onClick={() => handleClick(choice)}>{choice}</Btn>
      ))}
    </BtnWrap>
  );
}
export default ChoicesList
