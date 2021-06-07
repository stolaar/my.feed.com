import React, { Fragment } from "react";
import Backdrop from "../Backdrop";
import { CircularProgressbar } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

function LoaderPercentage({percentage}) {
  return (
    <Fragment>
      <Backdrop show={percentage} />
        <div style={{ width: 200, height: 200, left: '40%', position: 'absolute', zIndex: 1000}}>
            <CircularProgressbar styles={{background: {fill: '#fff'}}} value={percentage} text={`${percentage}%`} />;
        </div>
    </Fragment>
  );
}

export default LoaderPercentage;