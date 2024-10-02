import React, { FC, memo } from "react";
import classes from "./classes.module.scss";
import clsx from "clsx";
import { Event } from "../../../entities/event/model/types";

interface IEventInfoProps {
  small?: boolean;
  eventInfo: Event;
}

const EventInfo: FC<IEventInfoProps> = memo(({ small = false, eventInfo }) => {
  return (
    <div className={classes.block}>
      <h5>
        {new Date(new Date(eventInfo.dt_create).getTime()).toLocaleDateString()}
      </h5>
      <h3 className={clsx([small && classes.small])}>{eventInfo.title}</h3>
    </div>
  );
});

export default EventInfo;
