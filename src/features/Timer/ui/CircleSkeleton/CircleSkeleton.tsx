import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import classes from "./classes.module.scss";

const CircleSkeleton: FC = () => {
  return (
    <div className={classes.skeletonBlock}>
      <Skeleton
        circle
        width={149}
        height={149}
        baseColor="#12203e"
        highlightColor="#1e3465"
      />
    </div>
  );
};

export default CircleSkeleton;
