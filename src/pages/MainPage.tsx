import React, { useEffect, useState } from "react";

import classes from "./classes.module.scss";
import DateInfo from "../features/DateInfo/ui/DateInfo";
import EventInfo from "../features/EventInfo/ui/EventInfo";
import NearestEventInfo from "../features/NearestEventInfo/ui/NearestEventInfo";
import { Event, ServerResponse } from "../entities/event/model/types";

import MainDateInfo from "../features/MainDateInfo/ui/MainDateInfo";
import { findNearestEvent } from "../entities/event/model/selectors";

const MainPage: React.FC = () => {
  const [nearestEvent, setNearestEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetch("https://beta.sosportom.ru/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query videostandEvents($videostand_id: ID!) {
          videostandEvents(videostand_id: "6") {
            current_and_upcoming {
              title, is_main, dt_start, dt_end, dt_create
            }
          }
        }`,
      }),
    })
      .then((response) => response.json())
      .then((data: ServerResponse) => {
        const events = data.data.videostandEvents.current_and_upcoming;
        const nearestEvent = findNearestEvent(events);
        setNearestEvent(nearestEvent);
      });
  }, []);

  return (
    <div className={classes.main}>
      {nearestEvent ? (
        <>
          <DateInfo />
          <NearestEventInfo eventInfo={nearestEvent} />
          <EventInfo small eventInfo={nearestEvent} />
        </>
      ) : (
        <MainDateInfo />
      )}
    </div>
  );
};

export default MainPage;
