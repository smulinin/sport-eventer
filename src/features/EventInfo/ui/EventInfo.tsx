import React, { FC, memo } from "react";
import classes from "./classes.module.scss";
import clsx from "clsx";

interface IEventInfoProps {
  small?: boolean;
  name: string;
  date: Date;
}

const EventInfo: FC<IEventInfoProps> = memo(({ small = false, name, date }) => {
  return (
    <div className={classes.block}>
      <h5>{new Date(new Date(date).getTime()).toLocaleDateString()}</h5>
      <h3 className={clsx([small && classes.small])}>{name}</h3>
    </div>
  );
});

export default EventInfo;
