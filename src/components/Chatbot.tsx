import { useState } from 'react';
import type { Message } from '../types/message';

interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input
    };

    setChats(prev => {
      const updatedChats = [...prev];
      const index = updatedChats.findIndex(chat => chat.id === activeChatId);
      if (index !== -1) {
        updatedChats[index] = {
          ...updatedChats[index],
          messages: [...updatedChats[index].messages, userMessage]
        };
      }
      return updatedChats;
    });

    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistral',
          prompt: input,
          stream: false,
          options: {
            temperature: 0.7,
            max_tokens: 2000
          }
        })
      });

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || 'Je ne peux pas répondre à cette question.'
      };

      setChats(prev => {
        const updatedChats = [...prev];
        const index = updatedChats.findIndex(chat => chat.id === activeChatId);
        if (index !== -1) {
          updatedChats[index] = {
            ...updatedChats[index],
            messages: [...updatedChats[index].messages, assistantMessage]
          };
        }
        return updatedChats;
      });
    } catch (error) {
      console.error('Erreur:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Une erreur est survenue. Veuillez réessayer.'
      };
      setChats(prev => {
        const updatedChats = [...prev];
        const index = updatedChats.findIndex(chat => chat.id === activeChatId);
        if (index !== -1) {
          updatedChats[index] = {
            ...updatedChats[index],
            messages: [...updatedChats[index].messages, errorMessage]
          };
        }
        return updatedChats;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveChatId(Number(e.target.value));
  };

  const activeChat = chats.find(chat => chat.id === activeChatId) || chats[0];

  return (
    <div className="chat-container">
      <div className="chat-sider">
        <div className="chat-list-header">
          <h2>Conversations</h2>
        </div>
        <div className="chat-selector">
          <select
            value={activeChatId}
            onChange={handleChatChange}
            className="chat-selector-select"
            aria-label="Sélectionner une conversation"
          >
            {chats.map(chat => (
              <option key={chat.id} value={chat.id}>
                {chat.title}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={createNewChat}
          className="new-chat-button"
          title="Nouvelle conversation"
        >
          +
        </button>
      </div>
      <div className="chat-main">
        <div className="messages-container">
          {activeChat.messages.map((message: Message, index: number) => (
            <div key={index} className={`message ${message.role}`} role="article">
              <div className="message-content">
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Tapez votre message... (Shift+Enter pour une nouvelle ligne)"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
