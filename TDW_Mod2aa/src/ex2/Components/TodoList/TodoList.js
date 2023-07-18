import React from "react";
import Todo from "../Todo/Todo";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useContext } from "react";
import { TasksContext } from "../../ex2";

const List = styled.ul`
  margin-top: 1.2rem;

  > * + * {
    @media (min-width: 550px) {
      margin-top: 2.8rem;
    }
  }

  > * + * {
    margin-top: 2.5rem;
  }
`;

function TodoList({ filter, edit, remove, toggleChecked }) {
  const list = useContext(TasksContext);
  var filteredList = [];

  switch (filter) {
    case "Active":
      for (let i = 0; i < list.length; i++)
        if (!list[i].checked) filteredList.push(list[i]);
      break;
    case "Completed":
      for (let i = 0; i < list.length; i++)
        if (list[i].checked) filteredList.push(list[i]);
      break;
    default:
      filteredList = list;
      break;
  }

  return (
    <>
      <h2 id="list-heading" tabIndex="-1">
        {filteredList.length} tasks remaining
      </h2>
      <List
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {filteredList.map((element, key) => (
          <Todo
            key={element.id}
            element={element}
            edit={edit}
            remove={remove}
            filter={filter}
            toggleChecked={toggleChecked}
          ></Todo>
        ))}
      </List>
    </>
  );
}

// Typechecking in props
TodoList.propTypes = {
  filter: PropTypes.oneOf(["All", "Active", "Completed"]).isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  toggleChecked: PropTypes.func.isRequired,
};

export default TodoList;
