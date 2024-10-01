import React, { useEffect, useState } from "react";
import classes from "./classes.module.scss";
import EventInfo from "../../EventInfo/ui/EventInfo";
import Timer from "../../Timer/ui/Timer";
import EventInProgress from "../../EventInProgress/ui/EventInProgress";

const NearestEventInfo = () => {
  const targetDate = new Date("2024-10-15T23:59:59").getTime();

  return (
    <div className={classes.mainBlock}>
      <EventInfo date={new Date(targetDate)} name="Академия FIG В Ташкенте" />
      <Timer date={new Date(targetDate)} />
      {/* <EventInProgress /> */}
    </div>
  );
};

export default NearestEventInfo;
