import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Button = styled.button`
  padding: 0.8rem 1rem 0.7rem;
  border: 0.2rem solid #4d4d4d;
  cursor: pointer;
  text-transform: capitalize;

  color: #fff;
  background-color: #000;

  display: inline-block;
  width: 100%;
  font-size: 1.9rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  @media (min-width: 620px) {
    font-size: 2.4rem;
  }
`;

function FormButton({ type, className }) {
  return (
    <Button type={type} className={className}>
      Add
    </Button>
  );
}

// Typechecking in props
FormButton.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default FormButton;
