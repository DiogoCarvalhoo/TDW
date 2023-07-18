import Ex1 from "./ex1/ex1";
import Ex2 from "./ex2/ex2";
import Ex3 from "./ex3/ex3";
import Ex4 from "./ex4/ex4";
import Ex5 from "./ex5/ex5";
import Ex6 from "./ex6/ex6";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/ex1">Exercicio 1</Link>
            </li>
            <li>
              <Link to="/ex2">Exercicio 2</Link>
            </li>
            <li>
              <Link to="/ex3">Exercicio 3</Link>
            </li>
            <li>
              <Link to="/ex4">Exercicio 4</Link>
            </li>
            <li>
              <Link to="/ex5">Exercicio 5</Link>
            </li>
            <li>
              <Link to="/ex6">Exercicio 6</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/ex1" element={<Ex1 />} />
          <Route path="/ex2" element={<Ex2 />} />
          <Route path="/ex3" element={<Ex3 />} />
          <Route path="/ex4" element={<Ex4 />} />
          <Route path="/ex5" element={<Ex5 />} />
          <Route path="/ex6" element={<Ex6 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
