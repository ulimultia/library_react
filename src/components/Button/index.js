import React from 'react'

const Button = (props) => {
  const { label, handleClick } = props;

  return (
    <button onClick={handleClick} className="btn btn-primary btn-block">{label}</button>
  )
}

export default Button;