import React from "react";

const Card = (props) => {
  return (
    <div
      className={`flex flex-col absolute top-[5%] w-[80vw] rounded-xl drop-shadow-lg h-[90vh] justify-center items-center bg-neutral-100`}
    >
      {props.children}
    </div>
  );
};

export default Card;
