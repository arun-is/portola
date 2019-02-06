import React from "react";

const test = ({ top, bottom }) => {
  console.log("logic goes here");

  return (
    <div>
      <h1>{top.foo}</h1>
      <p>{bottom}</p>
    </div>
  );
};
