import { Event } from "../api/events/eventsApi";

export const deepEqual = (obj1: Event | null, obj2: Event | null): boolean => {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1) as Array<keyof Event>;
  const keys2 = Object.keys(obj2) as Array<keyof Event>;

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (!keys2.includes(key)) {
      return false;
    }

    const bothAreObjects = typeof val1 === "object" && typeof val2 === "object";
    if (bothAreObjects && val1 !== null && val2 !== null) {
      if (!deepEqual(val1 as Event, val2 as Event)) {
        return false;
      }
    } else if (val1 !== val2) {
      return false;
    }
  }

  return true;
};
