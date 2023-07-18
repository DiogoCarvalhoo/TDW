import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Button = styled.button`
  padding: 0.8rem 1rem 0.7rem;
  border: 0.2rem solid #4d4d4d;
  cursor: pointer;
  text-transform: capitalize;
`;

const ButtonFilter = styled(Button)`
  border-width: 1px;
  border-color: #d3d3d3;

  &[aria-pressed="true"] {
    text-decoration: underline;
    border-color: #4d4d4d;
  }
`;

const HiddenSpan = styled.span`
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
`;

function FilterButton({ type, className, ariaPressed, buttonText, setFilter }) {
  return (
    <ButtonFilter
      type={type}
      className={className}
      aria-pressed={ariaPressed}
      onClick={() => setFilter(buttonText)}
    >
      <HiddenSpan>Show</HiddenSpan>
      <span>{buttonText}</span>
      <HiddenSpan> tasks</HiddenSpan>
    </ButtonFilter>
  );
}

// Typechecking in props
FilterButton.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  ariaPressed: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default FilterButton;
