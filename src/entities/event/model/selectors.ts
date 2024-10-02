import moment from "moment";
import { Event } from "../../../shared/api/events/eventsApi";

interface IFindEventsInfoResult {
  currentEvent: Event | null;
  nearestEvent: Event | null;
  nextEvent: Event | null;
}

const sortByStartDate = (a: Event, b: Event) =>
  moment(a.dt_start).valueOf() - moment(b.dt_start).valueOf();

export const findEventsInfo = (events: Event[]): IFindEventsInfoResult => {
  let currentEvent: Event | null = null;
  let nearestEvent: Event | null = null;
  let nextEvent: Event | null = null;
  let mainEvent: Event | null = null;

  if (!events.length) {
    return { nearestEvent, nextEvent, currentEvent };
  }

  const now = moment().valueOf();

  currentEvent =
    events.find(
      (event) =>
        moment(event.dt_start).valueOf() <= now &&
        moment(event.dt_end).valueOf() >= now
    ) || null;

  let futureEvents = events.filter(
    (event) => moment(event.dt_start).valueOf() > now
  );

  mainEvent = futureEvents.find((event) => event.is_main) || null;

  nearestEvent =
    futureEvents
      .filter((event) => event !== mainEvent)
      .sort(sortByStartDate)[0] || null;

  if (currentEvent) {
    nextEvent = mainEvent || nearestEvent;
  } else {
    nearestEvent = mainEvent || nearestEvent;

    nextEvent =
      futureEvents
        .filter((event) => event !== nearestEvent)
        .sort(sortByStartDate)[0] || null;
  }

  return { nearestEvent, nextEvent, currentEvent };
};
