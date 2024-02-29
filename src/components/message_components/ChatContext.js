import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatData, setChatData] = useState(null);

  return React.createElement(
    ChatContext.Provider,
    { value: { chatData, setChatData } },
    children
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
