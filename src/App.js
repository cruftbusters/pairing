import { useEffect, useRef, useState } from 'react'
import useWebSocket from 'react-use-websocket'

const useId = () => {
  const id = useRef()
  if (id.current !== undefined) return id.current
  const { pathname } = window.location
  const match = pathname.match(/\/([0-9a-fA-F-]{36})/)
  if (match === null) return id.current
  id.current = match[1]
  return id.current
}

function App() {
  const pathId = useId()
  const [id, setId] = useState(pathId)
  const { sendMessage, lastMessage } = useWebSocket(
    `wss://pairing-ws.cruftbusters.com/session${
      pathId ? `/${pathId}` : ''
    }`,
  )

  const [message, setMessage] = useState('')
  useEffect(() => {
    if (id === undefined && lastMessage !== null) setId(lastMessage.data)
  }, [id, lastMessage])
  useEffect(() => {
    if (id !== undefined && lastMessage !== null)
      setMessage(lastMessage.data)
  }, [lastMessage])

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
        {`${window.location.protocol}//${window.location.host}/session${
          id ? `/${id}` : ''
        }`}
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
