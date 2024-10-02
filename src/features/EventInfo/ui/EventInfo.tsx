import React, { FC, memo } from "react";
import classes from "./classes.module.scss";
import clsx from "clsx";
import { formatEventDate } from "../../../shared/utils/formatters";
import { Event } from "../../../shared/api/events/eventsApi";

interface IEventInfoProps {
  small?: boolean;
  eventInfo: Event;
}

const EventInfo: FC<IEventInfoProps> = memo(({ small = false, eventInfo }) => {
  return (
    <div className={classes.block}>
      <h5>{formatEventDate(eventInfo.dt_start, eventInfo.dt_end)}</h5>
      <h3 className={clsx([small && classes.small])}>{eventInfo.title}</h3>
    </div>
  );
});

export default EventInfo;
