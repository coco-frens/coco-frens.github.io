import { useAppSelector } from '../app/hooks'

function Message() {

  const messageText = useAppSelector((state) => state.display.messageText)
  
  return (
    <div className="mintSection mint">
      {messageText}
    </div>
  )
}

export default Message
