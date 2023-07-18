import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import Footer from "../components/footer/footer";
import styled from "styled-components";

const MainDiv = styled.div`
  margin-top: 60px;
  padding: 20px 30px;
  transition: all 0.3s;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <MainDiv id="main">
          <Component {...pageProps} />
        </MainDiv>
        <Footer />
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
