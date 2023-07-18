import React from "react";
import FilterButton from "../FilterButton/FilterButton";

const TodoListFilter = (props) => {
  return (
    <div className="filters btn-group stack-execption">
      <FilterButton
        type="button"
        className="btn toggle-btn"
        ariaPressed={props.filter === "All" ? "true" : "false"}
        buttonText="All"
        setFilter={props.setFilter}
      ></FilterButton>
      <FilterButton
        type="button"
        className="btn toggle-btn"
        ariaPressed={props.filter === "Active" ? "true" : "false"}
        buttonText="Active"
        setFilter={props.setFilter}
      ></FilterButton>
      <FilterButton
        type="button"
        className="btn toggle-btn"
        ariaPressed={props.filter === "Completed" ? "true" : "false"}
        buttonText="Completed"
        setFilter={props.setFilter}
      ></FilterButton>
    </div>
  );
};

export default TodoListFilter;
