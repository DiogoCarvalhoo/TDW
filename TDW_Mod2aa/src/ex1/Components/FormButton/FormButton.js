import React from "react";

const FormButton = (props) => {
  return (
    <button type={props.type} className={props.className}>
      Add
    </button>
  );
};

export default FormButton;
