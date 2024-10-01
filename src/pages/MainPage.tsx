import React, { useState } from "react";

import { useCurrentTime } from "../entities/time/model/useCurrentTime";

import classes from "./classes.module.scss";
import DateInfo from "../features/DateInfo/ui/DateInfo";
import EventInfo from "../features/EventInfo/ui/EventInfo";
import NearestEventInfo from "../features/NearestEventInfo/ui/NearestEventInfo";
import EventInProgress from "../features/EventInProgress/ui/EventInProgress";
import MainDateInfo from "../features/MainDateInfo/ui/MainDateInfo";

const MainPage: React.FC = () => {
  const [events, setEvents] = useState([]);

  const currentTime = useCurrentTime();
  // const currentEvent = getCurrentEvent(events, currentTime);
  // const nextEvent = getNextEvent(events, currentTime);

  // useEffect(() => {
  //   fetch("https://beta.sosportom.ru/graphql/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       query: `query videostandEvents($videostand_id: ID!) {
  //         videostandEvents(videostand_id: "6") {
  //           current_and_upcoming {
  //             title, is_main, dt_start, dt_end, dt_create
  //           }
  //         }
  //       }`,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) =>
  //       setEvents(data.data.videostandEvents.current_and_upcoming)
  //     );
  // }, []);

  return (
    <div className={classes.main}>
      <DateInfo />
      <NearestEventInfo />
      <EventInfo
        name="Звёзды современной мировой гимнастики на одном помосте"
        small
        date={new Date()}
      />
      {/* <MainDateInfo /> */}
    </div>
  );
};

export default MainPage;
