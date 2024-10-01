import { Event } from "./types";

export function getCurrentEvent(
  events: Event[],
  currentTime: Date
): Event | null {
  return (
    events.find(
      (event) =>
        new Date(event.dt_start) <= currentTime &&
        new Date(event.dt_end) >= currentTime
    ) || null
  );
}

export function getNextEvent(events: Event[], currentTime: Date): Event | null {
  return events.find((event) => new Date(event.dt_start) > currentTime) || null;
}
