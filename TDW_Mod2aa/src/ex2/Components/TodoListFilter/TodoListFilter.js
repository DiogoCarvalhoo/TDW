import React from "react";
import FilterButton from "../FilterButton/FilterButton";
import PropTypes from "prop-types";
import styled from "styled-components";

const DivButtons = styled.div`
  width: 100%;
  margin: unset auto;

  display: flex;
  justify-content: space-between;

  margin-top: 1.2rem;

  > * {
    flex: 1 1 49%;
  }

  > * + * {
    margin-left: 0.8rem;
  }
`;

function TodoListFilter({ filter, setFilter }) {
  return (
    <DivButtons>
      <FilterButton
        type="button"
        className="btn toggle-btn"
        ariaPressed={filter === "All" ? "true" : "false"}
        buttonText="All"
        setFilter={setFilter}
      ></FilterButton>
      <FilterButton
        type="button"
        className="btn toggle-btn"
        ariaPressed={filter === "Active" ? "true" : "false"}
        buttonText="Active"
        setFilter={setFilter}
      ></FilterButton>
      <FilterButton
        type="button"
        className="btn toggle-btn"
        ariaPressed={filter === "Completed" ? "true" : "false"}
        buttonText="Completed"
        setFilter={setFilter}
      ></FilterButton>
    </DivButtons>
  );
}

// Typechecking in props
TodoListFilter.propTypes = {
  filter: PropTypes.oneOf(["All", "Active", "Completed"]).isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default TodoListFilter;
