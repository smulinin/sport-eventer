import React, { ReactNode } from "react";
import classes from "./classes.module.scss";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className={classes.wrapper}>{children}</div>;
};

export default Wrapper;
