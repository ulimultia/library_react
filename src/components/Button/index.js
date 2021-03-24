import React from 'react'

const Button = (props) => {
  const { label, handleClick,classButton } = props;

  return (
    <button onClick={handleClick} className={classButton}>{label}</button>
  )
}

export default Button;