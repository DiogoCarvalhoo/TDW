import "./ex5.css";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import Cats from "./Components/Cats/Cats";

function App() {
  return (
    <Provider store={store}>
      <Cats />
    </Provider>
  );
}

export default App;
