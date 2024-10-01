import React, { FC, memo, useEffect, useState } from "react";
import classes from "./classes.module.scss";

import moment from "moment";
import "moment/locale/ru";

const DateInfo: FC = memo(() => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.block}>
      <h3>{currentTime.format("HH:mm")}</h3>
      <h3>{currentTime.format("D MMMM • dddd")}</h3>
    </div>
  );
});

export default DateInfo;
