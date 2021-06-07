import React from 'react'

function Backdrop(props) {
  return props.show ? (
    <div className="backdrop" onClick={props.onClick} />
  ) : null
}

export default Backdrop
