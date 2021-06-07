import React from "react";

const style = {
  width: "100%",
  height: "100%",
  position: "fixed",
  zIndex: 500,
  left: 0,
  top: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
};

const Backdrop = (props) =>
  props.show ? <div style={style} onClick={props.clicked} /> : null;

export default Backdrop;
