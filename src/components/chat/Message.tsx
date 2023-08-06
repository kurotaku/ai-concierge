import React from 'react';
import TypingText from './TypingText';
import styled from 'styled-components';

const MessageWrap = styled.div`
  display: flex;
  margin-bottom: 24px;
  &.user{
    flex-direction: row-reverse;
    &>span{
      margin-left: 16px;
      margin-right: 0;
    }
  }
`
const Badge = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  color: white;
  font-size: 12px;
  background: #ccc;
  margin-right: 16px;
`;

const Bubble = styled.div`
  background: #f1f1f1;
  display: inline-block;
  padding: 8px;
  border-radius: 8px;
`

type MessageProps = {
  message: string;
  role: string;
  saved: boolean;
};

const Message = ({ message, role = 'user', saved = false }: MessageProps) => {
  return (
    <MessageWrap className={role}>
      <Badge>
        fffdf
      </Badge>
      <Bubble>
        {role == 'assistant' && !saved ? <TypingText text={message} typingSpeed={5} /> : message}
      </Bubble>
    </MessageWrap>
  );
};

export default Message;
