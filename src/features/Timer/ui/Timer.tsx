import React, { FC, useEffect, useState } from "react";
import classes from "./classes.module.scss";
import { pluralizeRu } from "../../../shared/utils/pluralize-ru";
import TimerCircle from "./TimerCircle/TimerCircle";
import CircleSkeleton from "./CircleSkeleton/CircleSkeleton";
import { deepEqual } from "../../../shared/utils/deep-equal";
import { Event } from "../../../shared/api/events/eventsApi";
import moment from "moment";

interface ITimerProps {
  eventInfo: Event;
}

const radius = 70;
const circumference = 2 * Math.PI * radius;
const maxTimerDaysCount = 7;

const calculateOffset = (value: number, total: number) => {
  return circumference - (circumference * value) / total;
};

enum CircleColorsEnum {
  DAYS = "#0062B5",
  HOURS = "#D62F0D",
  MINUTES = "#FDAE47",
  SECONDS = "#51acd8",
}

const Timer: FC<ITimerProps> = ({ eventInfo }) => {
  const [prevEventInfo, setPrevEventInfo] = useState<Event | null>(null);

  const [isCalculated, setIsCalculated] = useState<boolean>(true);

  useEffect(() => {
    if (!deepEqual(eventInfo, prevEventInfo)) {
      setIsCalculated(true);
      setPrevEventInfo(eventInfo);
    }
  }, [eventInfo, prevEventInfo]);

  const targetDate = moment(eventInfo.dt_start).valueOf();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      const isExtraDaysStage = totalDays > maxTimerDaysCount;
      const extraDays = isExtraDaysStage ? totalDays - maxTimerDaysCount : 0;

      const days = isExtraDaysStage ? extraDays : totalDays;
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });

      setIsCalculated(false);
    };

    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className={classes.block}>
      {isCalculated ? (
        <div className={classes.skeletonBlock}>
          {Array.from({ length: 4 }).map((val, index) => (
            <CircleSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <TimerCircle
            value={timeLeft.days}
            label={pluralizeRu(timeLeft.days, "день", "дня", "дней")}
            color={CircleColorsEnum.DAYS}
            strokeOffset={calculateOffset(
              timeLeft.days,
              timeLeft.days > maxTimerDaysCount
                ? maxTimerDaysCount
                : timeLeft.days
            )}
            radius={radius}
            circumference={circumference}
          />
          <TimerCircle
            value={timeLeft.hours}
            label={pluralizeRu(timeLeft.hours, "час", "часа", "часов")}
            color={CircleColorsEnum.HOURS}
            strokeOffset={calculateOffset(timeLeft.hours, 24)}
            radius={radius}
            circumference={circumference}
          />
          <TimerCircle
            value={timeLeft.minutes}
            label={pluralizeRu(timeLeft.minutes, "минута", "минуты", "минут")}
            color={CircleColorsEnum.MINUTES}
            strokeOffset={calculateOffset(timeLeft.minutes, 60)}
            radius={radius}
            circumference={circumference}
          />
          <TimerCircle
            value={timeLeft.seconds}
            label={pluralizeRu(
              timeLeft.seconds,
              "секунда",
              "секунды",
              "секунд"
            )}
            color={CircleColorsEnum.SECONDS}
            strokeOffset={calculateOffset(timeLeft.seconds, 60)}
            radius={radius}
            circumference={circumference}
          />
        </>
      )}
    </div>
  );
};

export default Timer;
