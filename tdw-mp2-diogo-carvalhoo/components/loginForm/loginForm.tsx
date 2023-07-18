import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import LocalStorage from "../../utils/localStorage";

const GameLoginForm = styled.form`
  width: 50%;
  margin: 0 auto;

  button {
    margin-top: 10px;
  }
`;

interface LoginFormProps {
  setLoginError: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginForm({ setLoginError }: LoginFormProps) {
  const router = useRouter();
  const localStorage = LocalStorage();
  const inputUsernameRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    setLoginError(false);
    const username = inputUsernameRef.current
      ? inputUsernameRef.current.value
      : "";
    const password = inputPasswordRef.current
      ? inputPasswordRef.current.value
      : "";

    if (username.length > 0 && password.length > 0) {
      const data = localStorage.getItem("users");
      const users = data === null || data === undefined ? [] : JSON.parse(data);

      let login = false;
      let register = true;
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          register = false;
          if (users[i].password === password) {
            login = true;
          }
          break;
        }
      }

      if (register) {
        users.push({ username: username, password: password, score: 0 });
        localStorage.setItem("users", JSON.stringify(users));
        router.push("/game/" + username);
      } else if (!login) {
        setLoginError(true);
        return;
      } else {
        router.push("/game/" + username);
      }
    } else {
      setLoginError(true);
    }
  };
  return (
    <GameLoginForm
      onSubmit={(event) => {
        event.preventDefault();
        handleLogin();
      }}
    >
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter username"
          ref={inputUsernameRef}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          ref={inputPasswordRef}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </GameLoginForm>
  );
}

export default LoginForm;
