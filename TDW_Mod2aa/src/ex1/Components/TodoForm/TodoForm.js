import React from "react";
import FormButton from "../FormButton/FormButton";
import { useRef } from "react";

const Form = (props) => {
  const inputRef = useRef(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.add(inputRef.current.value);
      }}
    >
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        defaultValue=""
        ref={inputRef}
      ></input>
      <FormButton
        type="submit"
        className="btn btn__primary btn__lg"
      ></FormButton>
    </form>
  );
};

export default Form;
