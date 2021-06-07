import React from "react";
import styles from "./styles.module.css";

function Container(props) {
  return <div className={styles.app}>{props.children}</div>;
}

export default Container;
