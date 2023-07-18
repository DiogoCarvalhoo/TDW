import React, { useState, useRef } from "react";

const Todo = (props) => {
  const [editable, setEditable] = useState(false);
  const [state, setState] = useState("Active");
  const inputRef = useRef(null);

  return (
    <>
      {props.filter === "All" || props.filter === state ? (
        <li className="todo">
          {editable ? (
            <form
              className="stack-small"
              onSubmit={(event) => {
                event.preventDefault();
                props.edit(props.index, inputRef.current.value);
                setEditable(false);
              }}
            >
              <div className="form-group">
                <label className="todo-label" htmlFor="todo-0">
                  New name for {props.element}
                </label>
                <input
                  id="todo-0"
                  className="todo-text"
                  type="text"
                  defaultValue=""
                  ref={inputRef}
                />
              </div>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn todo-cancel"
                  onClick={() => setEditable(false)}
                >
                  Cancel
                  <span className="visually-hidden">
                    renaming {props.element}
                  </span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                  Save
                  <span className="visually-hidden">
                    new name for {props.element}
                  </span>
                </button>
              </div>
            </form>
          ) : (
            <div className="stack-small">
              <div className="c-cb">
                <input
                  id="todo-0"
                  type="checkbox"
                  defaultChecked={state === "Active" ? false : true}
                  onClick={() =>
                    setState(state === "Active" ? "Completed" : "Active")
                  }
                />
                <label className="todo-label" htmlFor="todo-0">
                  {props.element}
                </label>
              </div>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setEditable(true)}
                >
                  Edit <span className="visually-hidden">{props.element}</span>
                </button>
                <button
                  type="button"
                  className="btn btn__danger"
                  onClick={() => props.remove(props.index)}
                >
                  Delete{" "}
                  <span className="visually-hidden">{props.element}</span>
                </button>
              </div>
            </div>
          )}
        </li>
      ) : null}
    </>
  );
};

export default Todo;
