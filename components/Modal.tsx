import React from 'react'

interface Props {
  changeModalShow: Function
}

const Modal: React.FC<Props> = ({ children, changeModalShow }) => {
  return (
    <div>
      <div
        className="fixed bg-black top-0 left-0 min-h-full min-w-full bg-opacity-25 transition duration-200 ease-in-out z-10"
        onClick={() => changeModalShow()}
      ></div>
      <div className="bg-white top-0 left-0 min-w-full fixed z-20">
        {children}
      </div>
    </div>
  )
}

export default Modal
