import { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'

function App() {
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])
  const { sendMessage, lastMessage } = useWebSocket(
    'wss://pairing-ws.cruftbusters.com/chat',
  )
  useEffect(() => {
    if (!lastMessage) return
    setHistory((history) => history.concat([lastMessage.data]))
  }, [lastMessage])

  return (
    <div>
      {history.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button
        onClick={() => {
          sendMessage(message)
          setHistory((history) => history.concat([message]))
          setMessage('')
        }}
      >
        send
      </button>
    </div>
  )
}

export default App
