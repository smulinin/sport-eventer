import React, { FC } from "react";
import classes from "./classes.module.scss";
import EventInfo from "../../features/EventInfo/ui/EventInfo";
import EventInProgress from "../../features/EventInProgress/ui/EventInProgress";
import Timer from "../../features/Timer/ui/Timer";
import { Event } from "../../shared/api/events/eventsApi";

interface INearestEventInfoProps {
  eventInfo: Event;
  haveCurrentEvent?: boolean;
}

const ActualEventWidget: FC<INearestEventInfoProps> = ({
  eventInfo,
  haveCurrentEvent = false,
}) => {
  return (
    <div className={classes.mainBlock}>
      <EventInfo eventInfo={eventInfo} />
      {haveCurrentEvent ? <EventInProgress /> : <Timer eventInfo={eventInfo} />}
    </div>
  );
};

export default ActualEventWidget;
