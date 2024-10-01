import React, { memo, useEffect, useState } from "react";
import classes from "./classes.module.scss";
import moment from "moment";
import "moment/locale/ru";

const MainDateInfo = memo(() => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.block}>
      <div className={classes.up}>
        <h3>{currentTime.format("HH:mm")}</h3>
      </div>
      <div className={classes.down}>
        <h3>{currentTime.format("D MMMM")}</h3>
        <h3>{currentTime.format("dddd")}</h3>
      </div>
    </div>
  );
});

export default MainDateInfo;
