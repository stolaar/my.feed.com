import React from "react";
import classnames from "classnames";

function Column({
  col,
  xs,
  sm,
  md,
  lg,
  xl,
  className,
  justifyContent,
  onClick,
  style = {},
  ...props
}) {
  return (
    <div
      style={style}
      onClick={onClick}
      className={classnames({
        [className]: className,
        ["col-" + col]: col,
        ["col-xs-" + xs]: xs,
        ["col-sm-" + sm]: sm,
        ["col-md-" + md]: md,
        ["col-lg-" + lg]: lg,
        ["col-xl-" + xl]: xl,
        ["justify-content-" + justifyContent]: justifyContent
      })}
    >
      {props.children}
    </div>
  );
}

Column.defaultProps = {
  col: null,
  xs: "12",
  sm: "12",
  md: null,
  lg: null,
  xl: null
};

export default Column;
