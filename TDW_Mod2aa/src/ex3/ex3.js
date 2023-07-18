import "./ex3.css";
import styled from "styled-components";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import Counter from "./Components/Counter/Counter";

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
  return (
    <Provider store={store}>
      <MainDiv className="todoapp stack-large">
        <Counter></Counter>
      </MainDiv>
    </Provider>
  );
}

export default App;
