import { useState } from 'react'
import useWebSocket from 'react-use-websocket'

function App() {
  const [message, setMessage] = useState()
  const { sendMessage, lastMessage } = useWebSocket(
    'wss://6cf3-184-105-52-168.ngrok.io/ping',
  )
  return (
    <div>
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button
        onClick={() => {
          sendMessage(message)
          setMessage('')
        }}
      >
        send
      </button>
      <div>
        {lastMessage ? lastMessage.data : 'Waiting for message...'}
      </div>
    </div>
  )
}

export default App
