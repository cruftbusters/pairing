import { useState } from 'react'
import useWebSocket from 'react-use-websocket'

function App() {
  const [message, setMessage] = useState()
  const { sendMessage, lastMessage } = useWebSocket(
    'ws://6.tcp.ngrok.io:17616/ping',
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
