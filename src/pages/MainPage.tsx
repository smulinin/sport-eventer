import React, { useEffect, useState } from "react";

import classes from "./classes.module.scss";

import EventInfo from "../features/EventInfo/ui/EventInfo";

import { findEventsInfo } from "../entities/event/model/selectors";
import ActualEventWidget from "../widgets/ActualEventWidget/ActualEventWidget";
import MainDateWidget from "../widgets/MainDateWidget/MainDateWidget";
import { Event, fetchEvents } from "../shared/api/events/eventsApi";
import MiniDateWidget from "../widgets/MiniDateWidget/MiniDateWidget";
import axios from "axios";

export interface IEventList {
  isRequested: boolean;
  usefulData: {
    currentEvent: Event | null;
    nearestEvent: Event | null;
    nextEvent: Event | null;
  };
  prevApiData: [];
}

const pingIntervalValueMsc = 5000;

const MainPage: React.FC = () => {
  const [keyEventsData, setKeyEventsData] = useState<IEventList>({
    isRequested: false,
    usefulData: {
      currentEvent: null,
      nearestEvent: null,
      nextEvent: null,
    },
    prevApiData: [],
  });

  const fetchData = async () => {
    setKeyEventsData((prev) => ({
      ...prev,
      isRequested: true,
    }));
    try {
      // const fetchEventsResponse = await fetchEvents("6");

      const { data: fetchEventsResponse } = await axios.get(
        "https://1e71ae2bb46b.ngrok.app/user/vasya"
      );

      const events =
        fetchEventsResponse.data.videostandEvents.current_and_upcoming;
      const { currentEvent, nearestEvent, nextEvent } = findEventsInfo(events);
      setKeyEventsData((prev) => ({
        ...prev,
        usefulData: {
          ...prev.usefulData,
          currentEvent,
          nearestEvent,
          nextEvent,
        },
      }));
    } catch (error) {
    } finally {
      setKeyEventsData((prev) => ({
        ...prev,
        isRequested: false,
      }));
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, pingIntervalValueMsc);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={classes.main}>
      {keyEventsData.usefulData.currentEvent ||
      keyEventsData.usefulData.nearestEvent ? (
        <>
          <MiniDateWidget />
          <ActualEventWidget
            eventInfo={
              keyEventsData.usefulData.currentEvent ||
              keyEventsData.usefulData.nearestEvent!
            }
            haveCurrentEvent={!!keyEventsData.usefulData.currentEvent}
          />
          {keyEventsData.usefulData.nextEvent ? (
            <EventInfo small eventInfo={keyEventsData.usefulData.nextEvent} />
          ) : null}
        </>
      ) : (
        <MainDateWidget />
      )}
    </div>
  );
};

export default MainPage;
