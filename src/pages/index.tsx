import React, { useState, useRef, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Layout from '../components/Layout'
import Roading from '../components/chat/Roading';
import { TextArea } from '../components/chat/input';
import Message from '../components/chat/Message';
import ChoicesList from '../components/chat/ChoicesList';
import Plan from '../components/chat/Plan';
import Submit from '../components/chat/Submit';

function autosize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 4 + 'px';
}

const IndexPage = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [choices, setChoices] = useState([]);
  const [plans, setPlans] = useState([]);

  const { register, handleSubmit } = useForm();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  const callGpt = async (text: string) => {
    setUserInput('');
    setLoading(true);
    setChoices([]);
    setPlans([]);
    setMessages((prevMessages) => [...prevMessages, { role: 'user', content: text }]);
    const call = await axios.post(
      '/api/private/gpt',
      { messages: [...messages, { role: 'user', content: text + '必ず指定したjsonフォーマットで返答してください。' }] },
      { withCredentials: true },
    );

    const assistantMessage = call.data.choices[0].message.content;

    let jsonObject;
    
    try {
      jsonObject = JSON.parse(assistantMessage);
      setChoices(Object.values(jsonObject.choices));
      setPlans(Object.values(jsonObject.plans));
    } catch (error) {
      console.error("Invalid JSON string:", error);
    }

    if (!jsonObject) {
      console.error("Failed to parse JSON string");
    } else {
      console.log(jsonObject);
    }
    
    setLoading(false);

    setMessages((prevMessages) => [...prevMessages, {role: 'assistant', content: jsonObject.question}]);
  }

  const onSubmit = async (data) => {
    callGpt(userInput);
  }

  return (
    <Layout>
      <div style={{
          display: "flex",
          width: "100%",
          height: "100vh"
      }}>
        <div style={{ width: "100%" }}>
          {messages.map((message, index) => (
            <Message
              key={index}
              message={message.content}
              role={message.role}
              saved={!!message.createdAt}
            />
          ))}
          <ChoicesList choices={choices} onChoiceSelected={callGpt} />
          {isLoading && <Roading />}

          <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", alignItems: "start", marginTop: "16px"}}>
            <TextArea as="textarea"
              {...register('message')}
              ref={textAreaRef}
              rows={1}
              placeholder='質問を入力してください'
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                autosize(e.target);
                setUserInput(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              value={userInput}
              disabled={isLoading}
            />

            <Submit
              type='submit'
              style={{marginLeft: "4px"}}
              disabled={isLoading || userInput.length == 0}
            >
              {isLoading ? '回答待ち' : '送信'}
            </Submit>
          </form>
        </div>

        <div style={{
          flex: "0 0 auto",
          width: "400px",
          marginLeft: "40px"
        }}>
          {plans.map((plan: string, index) => (
            <div key={index}>
              <Plan text={plan} />
            </div>
          ))}
        </div>
      </div>

    </Layout>
  );
}

export default IndexPage
