import React from 'react'

interface Props {
  title: string | undefined
  show: number
}

const Message: React.FunctionComponent<Props> = ({
  title,
  show
}) => {
  const [messageStatus, setMessageStatus] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (title != '') {
      setMessageStatus(true)
      setTimeout(()=> {
        setMessageStatus(false)
      }, 1000)
    } else {
      setMessageStatus(false)
    }
  }, [title, show])

  return (
    <>
      {messageStatus &&
        <div 
          className="message w-full h-screen flex items-center justify-center z-50"
        >
          <div className="info max-w-100 leading-20 bg-black text-white px-5 py-3 rounded-sm text-14">{title}</div>
          <style jsx>{`
            .message {
              position: fixed;
              top: 0px;
              left: 0px;
            }
          `}</style>
        </div>
      }
    </>
  )
}

export default Message
