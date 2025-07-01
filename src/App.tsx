import Chatbot from './components/Chatbot'
import './App.css'
import './components/Chatbot.css'
import { ChatListProvider } from './components/ChatList'

function App() {
  return (
    <div className="app">
      <h1>Chatbot avec Ollama</h1>
      <ChatListProvider>
        <Chatbot />
      </ChatListProvider>
    </div>
  )
}

export default App
