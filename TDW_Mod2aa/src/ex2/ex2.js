import "./ex2.css";
import TodoForm from "./Components/TodoForm/TodoForm";
import TodoListFilter from "./Components/TodoListFilter/TodoListFilter";
import TodoList from "./Components/TodoList/TodoList";
import { useEffect, useState } from "react";
import styled from "styled-components";
import React from "react";

export const TasksContext = React.createContext();

const MainDiv = styled.div`
  background: #fff;
  margin: 2rem 0 4rem 0;
  padding: 1rem;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);

  > * {
    max-width: 50rem;
    margin-left: auto;
    margin-right: auto;
  }

  > form {
    max-width: 100%;
  }

  > h1 {
    display: block;
    max-width: 100%;
    text-align: center;
    margin: 0;
    margin-bottom: 1rem;
  }

  > * + * {
    margin-top: 2.5rem;
  }

  @media screen and (min-width: 550px) {
    padding: 4rem;
    > * + * {
      margin-top: 2.8rem;
    }
  }
`;

function App() {
  const [list, setList] = useState([
    { id: 0, name: "Eat", checked: true },
    { id: 1, name: "Sleep", checked: false },
    { id: 2, name: "Repeat", checked: false },
  ]);
  const [filter, setFilter] = useState("All");

  const add = (newTaskName) => {
    let newId = Math.max(...list.map((task) => task.id)) + 1;

    // If list is empty
    if (newId === -Infinity) newId = 0;
    const newTask = { id: newId, name: newTaskName, checked: false };
    setList([...list, newTask]);
  };

  const edit = (id, newName) => {
    let index = list.findIndex((task) => task.id === id);
    let updatedList = [...list];
    updatedList[index] = { ...list[index], name: newName };
    setList(updatedList);
  };

  const remove = (id) => {
    let index = list.findIndex((task) => task.id === id);
    let udpatedList = [...list];
    udpatedList.splice(index, 1);
    setList(udpatedList);
  };

  const toggleChecked = (id) => {
    let index = list.findIndex((task) => task.id === id);

    let updatedList = [...list];
    updatedList[index] = {
      ...updatedList[index],
      checked: !updatedList[index].checked,
    };
    setList(updatedList);
  };

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `To Do - ${list.length} tasks`;
  }, [list]);

  return (
    <TasksContext.Provider value={list}>
      <MainDiv className="todoapp stack-large">
        <TodoForm add={add}></TodoForm>
        <TodoListFilter filter={filter} setFilter={setFilter}></TodoListFilter>
        <TodoList
          list={list}
          filter={filter}
          edit={edit}
          remove={remove}
          toggleChecked={toggleChecked}
        ></TodoList>
        TodoForm
      </MainDiv>
    </TasksContext.Provider>
  );
}

export default App;
