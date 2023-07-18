import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

const Todo = ({ element, edit, remove, filter, toggleChecked }) => {
  const [editable, setEditable] = useState(false);
  const inputRef = useRef(null);

  return (
    <>
      <li className="todo">
        {editable ? (
          <form
            className="stack-small"
            onSubmit={(event) => {
              event.preventDefault();
              edit(element.id, inputRef.current.value);
              setEditable(false);
            }}
          >
            <div className="form-group">
              <label className="todo-label" htmlFor="todo-0">
                New name for {element.name}
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
                <span className="visually-hidden">renaming {element.name}</span>
              </button>
              <button type="submit" className="btn btn__primary todo-edit">
                Save
                <span className="visually-hidden">
                  new name for {element.name}
                </span>
              </button>
            </div>
          </form>
        ) : (
          <div className="stack-small">
            <div className="c-cb">
              <input
                id={"todo-" + element.id}
                type="checkbox"
                defaultChecked={element.checked}
                onChange={() => toggleChecked(element.id)}
              />
              <label className="todo-label" htmlFor="todo-0">
                {element.name}
              </label>
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn"
                onClick={() => setEditable(true)}
              >
                Edit <span className="visually-hidden">{element.name}</span>
              </button>
              <button
                type="button"
                className="btn btn__danger"
                onClick={() => remove(element.id)}
              >
                Delete <span className="visually-hidden">{element.name}</span>
              </button>
            </div>
          </div>
        )}
      </li>
    </>
  );
};

// Typechecking in props
Todo.propTypes = {
  element: PropTypes.object.isRequired,
  filter: PropTypes.oneOf(["All", "Active", "Completed"]).isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  toggleChecked: PropTypes.func.isRequired,
};

export default Todo;
