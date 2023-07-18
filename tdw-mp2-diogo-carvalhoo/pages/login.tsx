import React, { useState, useEffect } from "react";

import PageTitle from "../components/pagetitle/pagetitle";
import { CardDiv, CardBodyDiv, CardTitleH5 } from "../components/styles/card";
import { GrFormClose } from "react-icons/gr";
import LoginForm from "../components/loginForm/loginForm";
import LocalStorage from "../utils/localStorage";

export interface UserType {
  username: string;
  password: string;
  score: number;
}

export default function Login() {
  const localStorage = LocalStorage();
  const [loginError, setLoginError] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<UserType>>([]);

  useEffect(() => {
    const data = localStorage.getItem("users");
    if (data !== null && data !== undefined && data !== "") {
      const rawData = JSON.parse(data);

      rawData.sort((a: { score: number }, b: { score: number }) =>
        a.score < b.score ? 1 : b.score < a.score ? -1 : 0
      );

      setUsers(rawData);
    } else {
      setUsers([]);
    }
  }, []);

  return (
    <>
      <PageTitle
        currentPage={"Login"}
        currentPageHref={"/login"}
        previousPage={"Home"}
        previousPageHref={"/"}
      ></PageTitle>

      {loginError ? (
        <div className="alert alert-danger" role="alert">
          This is a danger alert—check it out!
          <GrFormClose
            style={{ position: "absolute", right: "10px" }}
            onClick={() => setLoginError(false)}
          ></GrFormClose>
        </div>
      ) : null}
      <div className="row">
        <div className="col-12">
          <CardDiv>
            <CardBodyDiv>
              <CardTitleH5>
                Mini Game <span>| Login</span>
                <LoginForm setLoginError={setLoginError}></LoginForm>
              </CardTitleH5>
            </CardBodyDiv>
          </CardDiv>

          <CardDiv>
            <CardBodyDiv>
              <CardTitleH5>
                Mini Game <span>| Ranking</span>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Username</th>
                      <th scope="col">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(users).map((key: string, index: number) => {
                      return (
                        <tr key={index}>
                          <th>{key}</th>
                          <td>{users[index].username}</td>
                          <td>{users[index].score}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardTitleH5>
            </CardBodyDiv>
          </CardDiv>
        </div>
      </div>
    </>
  );
}
