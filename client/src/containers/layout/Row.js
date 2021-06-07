import React from 'react'
import classnames from 'classnames'

function Row({ style = {}, className, justify, ...props }) {
  return (
    <div
      style={style}
      className={classnames('row', {
        ['justify-content-' + justify]: justify,
        [className]: className
      })}
    >
      {props.children}
    </div>
  )
}

Row.defaultProps = {
  justify: 'center'
}

export default Row
