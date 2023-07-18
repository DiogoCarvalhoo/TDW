import React from "react";

const FilterButton = (props) => {
  return (
    <button
      type={props.type}
      className={props.className}
      aria-pressed={props.ariaPressed}
      onClick={() => props.setFilter(props.buttonText)}
    >
      <span className="visually-hidden">Show</span>
      <span>{props.buttonText}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
};

export default FilterButton;
