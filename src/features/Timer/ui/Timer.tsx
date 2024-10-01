import React, { FC, useEffect, useState } from "react";
import classes from "./classes.module.scss";
import { pluralizeRu } from "../../../shared/utils/pluralize-ru";
import EventInfo from "../../EventInfo/ui/EventInfo";

interface ITimerProps {
  date: Date;
}

const Timer: FC<ITimerProps> = ({ date }) => {
  const targetDate = date.getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const [dayOffset, setDayOffset] = useState(circumference);
  const [hourOffset, setHourOffset] = useState(circumference);
  const [minuteOffset, setMinuteOffset] = useState(circumference);
  const [secondOffset, setSecondOffset] = useState(circumference);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });

      const totalDays = (targetDate - Date.now()) / (1000 * 60 * 60 * 24);
      setDayOffset(circumference - (circumference * days) / totalDays);

      const totalHours = 24;
      const totalMinutes = 60;
      const totalSeconds = 60;

      setHourOffset(circumference - (circumference * hours) / totalHours);
      setMinuteOffset(circumference - (circumference * minutes) / totalMinutes);
      setSecondOffset(circumference - (circumference * seconds) / totalSeconds);
    };

    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [circumference, targetDate]);

  return (
    <div className={classes.block}>
      <div>
        <svg width="200" height="200">
          <circle cx="100" cy="100" r={radius} strokeWidth="10" fill="none" />
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#0062B5"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={dayOffset}
            strokeLinecap="round"
          />
          <text
            x="100"
            y="100"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="24px"
            className={classes.svgText}
          >
            <tspan x="100" dy="-10" fontSize="24px">
              {timeLeft.days}
            </tspan>
            <tspan x="100" dy="35" fontSize="16px">
              {pluralizeRu(timeLeft.days, "день", "дня", "дней")}
            </tspan>
          </text>
        </svg>
      </div>
      <div>
        <svg width="200" height="200">
          <circle cx="100" cy="100" r={radius} strokeWidth="10" fill="none" />
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#D62F0D"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={hourOffset}
            strokeLinecap="round"
          />
          <text
            x="100"
            y="100"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="24px"
            className={classes.svgText}
          >
            <tspan x="100" dy="-10" fontSize="24px">
              {timeLeft.hours}
            </tspan>
            <tspan x="100" dy="35" fontSize="16px">
              {pluralizeRu(timeLeft.hours, "час", "часа", "часов")}
            </tspan>
          </text>
        </svg>
      </div>
      <div>
        <svg width="200" height="200">
          <circle cx="100" cy="100" r={radius} strokeWidth="10" fill="none" />
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#FDAE47"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={minuteOffset}
            strokeLinecap="round"
          />
          <text
            x="100"
            y="100"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="24px"
            className={classes.svgText}
          >
            <tspan x="100" dy="-10" fontSize="24px">
              {timeLeft.minutes}
            </tspan>
            <tspan x="100" dy="35" fontSize="16px">
              {pluralizeRu(timeLeft.minutes, "минута", "минуты", "минут")}
            </tspan>
          </text>
        </svg>
      </div>
      <div>
        <svg width="200" height="200">
          <circle cx="100" cy="100" r={radius} strokeWidth="10" fill="none" />
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#51acd8"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={secondOffset}
            strokeLinecap="round"
          />
          <text
            x="100"
            y="100"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="24px"
            className={classes.svgText}
          >
            <tspan x="100" dy="-10" fontSize="24px">
              {timeLeft.seconds}
            </tspan>
            <tspan x="100" dy="35" fontSize="16px">
              {pluralizeRu(timeLeft.seconds, "секунда", "секунды", "секунд")}
            </tspan>
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Timer;
