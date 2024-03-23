import React from 'react'

import type { ToastMessage } from '../../hooks/toast'
import { Container } from './styles'
// eslint-disable-next-line import/no-cycle
import Toast from './Toast'

interface ToastContainerProps {
  messages: ToastMessage[]
}

const Toasts: React.FC<ToastContainerProps> = ({ messages }) => {
  // const [items, setItems] = useState(tst)

  // const messagesWithTransitions = useTransition(items, {
  //   from: { right: '-120%', opacity: 0 },
  //   enter: { right: '0%', opacity: 1 },
  //   leave: { right: '-120%', opacity: 0 },
  //   delay: 200,
  //   onRest: () => setItems([])
  // })
  // const messagesWithTransitions = useTransition(
  //   messages,
  //   message => message.id,
  //   {
  //     from: { right: '-120%', opacity: 0 },
  //     enter: { right: '0%', opacity: 1 },
  //     leave: { right: '-120%', opacity: 0 }
  //   }
  // )

  return (
    <Container>
      {/* {messagesWithTransitions(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}  */}
      {messages.map(message => {
        return <Toast key={message.id} message={message} />
      })}
    </Container>
  )
}

export default Toasts
