import React, { memo } from "react";

import classes from "./classes.module.scss";

const EventInProgress = memo(() => {
  return (
    <div className={classes.block}>
      <h5>Идёт сейчас</h5>
    </div>
  );
});

export default EventInProgress;
