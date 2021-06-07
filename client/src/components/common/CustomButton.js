import React from 'react'
import './Common.css'
import classnames from 'classnames'

function CustomButton({
  onClick,
  wrapperClassName,
  textClassName,
  text,
  style = {},
  textStyle = {},
  disabled,
  icon,
  iconClassName,
  dataToggle
}) {
  return (
    <div
      data-toggle={dataToggle ? dataToggle : null}
      aria-disabled={disabled}
      style={style}
      onClick={disabled ? () => {} : onClick}
      className={classnames('custom-btn-container', wrapperClassName, {
        disabled
      })}
    >
      {icon ? <img alt="icon" src={icon} className={iconClassName} /> : null}
      <span style={textStyle} className={textClassName}>
        {text}
      </span>
    </div>
  )
}

export default CustomButton
