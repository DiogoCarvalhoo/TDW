import React from "react";
import FormButton from "../FormButton/FormButton";
import { useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Header = styled.h2`
  margin: 0;
  flex: 0 0 100%;
  text-align: center;
`;

const Label = styled.label`
  line-height: 1.01567;
  font-weight: 300;
  padding: 0.8rem;
  margin-bottom: 1rem;
  text-align: center;
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

const Input = styled.input`
  padding: 2rem;
  border: 2px solid #000;
  display: inline-block;
  width: 100%;
  font-size: 1.9rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  @media (min-width: 620px) {
    font-size: 2.4rem;
  }

  &:focus {
    border-color: #4d4d4d;
    box-shadow: inset 0 0 0 2px;
  }
`;

function TodoForm({ add }) {
  const inputRef = useRef(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        add(inputRef.current.value);
      }}
    >
      <Header className="label-wrapper">
        <Label htmlFor="new-todo-input">What needs to be done?</Label>
      </Header>
      <Input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        defaultValue=""
        ref={inputRef}
      ></Input>
      <FormButton
        type="submit"
        className="btn btn__primary btn__lg"
      ></FormButton>
    </form>
  );
}

// Typechecking in props
TodoForm.propTypes = {
  add: PropTypes.func.isRequired,
};

export default TodoForm;
