import React from "react";
import Todo from "../Todo/Todo";

const TodoList = (props) => {
  return (
    <>
      <h2 id="list-heading" tabIndex="-1">
        3 tasks remaining
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {props.list.map((element, index) => (
          <Todo
            key={index}
            index={index}
            element={element}
            edit={props.edit}
            remove={props.remove}
            filter={props.filter}
          ></Todo>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
