import { Event } from "./types";

export const findNearestEvent = (events: Event[]): Event | null => {
  if (!events.length) {
    return null;
  }

  const now = new Date().getTime();

  const currentEvent = events.find(
    (event) =>
      new Date(event.dt_start).getTime() <= now &&
      new Date(event.dt_end).getTime() >= now
  );

  if (currentEvent) {
    return currentEvent;
  }

  const nearestEvent = events
    .filter((event) => new Date(event.dt_start).getTime() > now)
    .sort(
      (a, b) => new Date(a.dt_start).getTime() - new Date(b.dt_start).getTime()
    )[0];

  return nearestEvent;
};
