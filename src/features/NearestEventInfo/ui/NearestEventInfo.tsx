import React, { FC, useEffect, useState } from "react";
import classes from "./classes.module.scss";
import EventInfo from "../../EventInfo/ui/EventInfo";
import Timer from "../../Timer/ui/Timer";
import EventInProgress from "../../EventInProgress/ui/EventInProgress";
import { Event } from "../../../entities/event/model/types";

interface INearestEventInfoProps {
  eventInfo: Event;
}

const NearestEventInfo: FC<INearestEventInfoProps> = ({ eventInfo }) => {
  const now = new Date().getTime();

  const isCurrentEvent =
    new Date(eventInfo.dt_start).getTime() <= now &&
    new Date(eventInfo.dt_end).getTime() >= now;

  return (
    <div className={classes.mainBlock}>
      {isCurrentEvent ? (
        <EventInProgress />
      ) : (
        <>
          <EventInfo eventInfo={eventInfo} />
          <Timer eventInfo={eventInfo} />
        </>
      )}
    </div>
  );
};

export default NearestEventInfo;
