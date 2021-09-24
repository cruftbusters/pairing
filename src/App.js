import { useEffect, useRef, useState } from 'react'
import useWebSocket from 'react-use-websocket'

function App() {
  const [message, setMessage] = useState('')
  const [id, setId] = useState()
  const { sendMessage } = useWebSocket(
    'wss://pairing-ws.cruftbusters.com/session',
    {
      onClose: () => setId(undefined),
      onMessage: ({ data }) => {
        if (id === undefined) {
          setId(data)
        } else {
          setMessage(data)
        }
      },
    },
  )

  const lastMessageRef = useRef()
  useEffect(() => {
    if (message === lastMessageRef.current) return
    sendMessage(message)
  }, [message, sendMessage])

  return (
    <div
      style={{
        backgroundColor: 'black',
        color: 'white',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '0.25em',
        }}
      >
        {id}
      </div>
      <textarea
        value={message}
        onChange={(e) => {
          sendMessage(e.target.value)
          setMessage(e.target.value)
        }}
        style={{
          flex: 1,
          padding: '0.25em',
          border: 0,
          margin: 0,
          resize: 'none',
          boxSizing: 'border-box',
          minWidth: '100%',
        }}
      />
    </div>
  )
}

export default App
