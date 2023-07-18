import "./ex1.css";
import TodoForm from "./Components/TodoForm/TodoForm";
import TodoListFilter from "./Components/TodoListFilter/TodoListFilter";
import TodoList from "./Components/TodoList/TodoList";
import { useState } from "react";

function App() {
  const [list, setList] = useState(["Eat", "Sleep", "Repeat"]);
  const [filter, setFilter] = useState("All");

  function add(element) {
    setList([...list, element]);
  }

  function edit(index, newelement) {
    const newlist = list.map((item, itemIndex) => {
      if (index === itemIndex) {
        return newelement;
      } else {
        return item;
      }
    });
    setList(newlist);
  }

  function remove(index) {
    var newlist = list.filter((item, itemIndex) => itemIndex !== index);
    setList(newlist);
    console.log(newlist);
  }

  return (
    <div className="todoapp stack-large">
      <TodoForm add={add}></TodoForm>
      <TodoListFilter filter={filter} setFilter={setFilter}></TodoListFilter>
      <TodoList
        list={list}
        filter={filter}
        edit={edit}
        remove={remove}
      ></TodoList>
    </div>
  );
}

export default App;
