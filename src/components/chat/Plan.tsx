import TypingText from "./TypingText";
import styled from "styled-components";

type PlanProps = {
  text: string;
};

const PlanItem = styled.div`
  background: #f1f1f1;
  padding: 16px;
  margin-bottom: 20px;
`

const Plan: React.FC<PlanProps> = ({ text }) => {
  return (
    <PlanItem>
      <TypingText text={text} typingSpeed={30} />
    </PlanItem>
  )
}

export default Plan