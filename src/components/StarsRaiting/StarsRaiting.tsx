"use client";

import React, { FC } from "react";
import ReactStars from "react-stars";

interface StarsRaitingProps {
  value?: number;
  isEditable?: boolean;
  setStars?: Function;
}

const StarsRaiting: FC<StarsRaitingProps> = ({
  value,
  isEditable = true,
  setStars,
}) => {
  const sendRate = (value) => {
    setStars(value);
  };
  return (
    <>
      <ReactStars
        count={5}
        size={24}
        color2={"#ffd700"}
        half={false}
        onChange={sendRate}
        value={value}
        edit={isEditable}
      />
    </>
  );
};

export default StarsRaiting;
