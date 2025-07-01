import { useState, createContext, useContext } from 'react';
import type { Message } from '../types/message';

interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

export interface ChatListContextType {
  chats: Chat[];
  activeChatId: number;
  setActiveChatId: (id: number) => void;
  createNewChat: () => void;
  addMessage: (message: Message) => void;
  getActiveChat: () => Chat;
}

export const ChatListContext = createContext<ChatListContextType | undefined>(undefined);

export const ChatListProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      title: 'Nouvelle conversation',
      messages: []
    }
  ]);
  const [activeChatId, setActiveChatId] = useState(1);

  const createNewChat = () => {
    const newChat: Chat = {
      id: chats.length + 1,
      title: `Conversation ${chats.length + 1}`,
      messages: []
    };
    setChats(prev => [...prev, newChat]);
    setActiveChatId(newChat.id);
  };

  const getActiveChat = () => {
    return chats.find(chat => chat.id === activeChatId) || chats[0];
  };

  const addMessage = (message: Message) => {
    setChats(prev => {
      const updatedChats = [...prev];
      const index = updatedChats.findIndex(chat => chat.id === activeChatId);
      if (index !== -1) {
        updatedChats[index] = {
          ...updatedChats[index],
          messages: [...updatedChats[index].messages, message]
        };
      }
      return updatedChats;
    });
  };

  return (
    <ChatListContext.Provider value={{
      chats,
      activeChatId,
      setActiveChatId,
      createNewChat,
      addMessage,
      getActiveChat
    }}>
      {children}
    </ChatListContext.Provider>
  );
};

export const ChatList = () => {
  const { chats, activeChatId } = useContext(ChatListContext) as ChatListContextType;

  if (!chats) return null;

  const handleChatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newActiveChatId = Number(e.target.value);
    const { setActiveChatId } = useContext(ChatListContext) as ChatListContextType;
    setActiveChatId(newActiveChatId);
  };

  return (
    <div className="chat-list-container">
      <div className="chat-selector">
        <select
          value={activeChatId}
          onChange={handleChatChange}
          className="chat-selector-select"
          title="Sélectionner une conversation"
        >
          {chats.map(chat => (
            <option key={chat.id} value={chat.id}>
              {chat.title}
            </option>
          ))}
        </select>
      </div>
      <button 
        onClick={() => {
          const { createNewChat } = useContext(ChatListContext) as ChatListContextType;
          createNewChat();
        }} 
        className="new-chat-button"
        title="Nouvelle conversation"
      >
        +
      </button>
      <div className="chat-content">
        {chats.map(chat => 
          chat.id === activeChatId && (
            <>
              {chat.messages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                  <div className="message-content">
                    {message.content}
                  </div>
                </div>
              ))}
            </>
          )
        )}
      </div>
    </div>
  );
};
