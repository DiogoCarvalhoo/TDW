import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import SideBar from "../components/sidebar/sidebar";
import SideBarButton from "../components/sidebar/sidebarbutton";
import { SessionProvider } from "next-auth/react";
import Router from "next/router"

import { Provider } from "react-redux";
import { wrapper, store } from "../redux/store";
import Loading from "../components/utils/loading";

const Wrapper = styled.div`
  overflow-x: hidden;

  &.toggled > #sidebar-wrapper {
    margin-left: 0;
  }

  @media (min-width: 768px) {
    #sidebar-wrapper {
      margin-left: 0;
    }

    &.toggled > #sidebar-wrapper {
      margin-left: -15rem;
    }
  }
`;

const PageContentWrapper = styled.div`
  width: 100%;
  background-image: linear-gradient(
    270deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(90, 227, 255, 1) 100%
  );
`;

function App({ Component, pageProps }: AppProps) {
  const wrapper_div = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSideBarStatus = () => {
    if (wrapper_div.current) {
      wrapper_div.current.classList.toggle("toggled");
    }
  };

  useEffect(() => {
    const start = () => {
      setIsLoading(true);
    }
    const end = () => {
      setIsLoading(false);
    }
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Wrapper className={`d-flex`} ref={wrapper_div}>
          <SideBar />
          <PageContentWrapper id="page-content-wrapper">
            <SideBarButton
              handleSideBar={useCallback(handleSideBarStatus, [])}
            />
            {isLoading ? (
              <Loading />
            ): (
              <Component {...pageProps} />
            )}
          </PageContentWrapper>
        </Wrapper>
      </SessionProvider>
    </Provider>
  );
}

export default wrapper.withRedux(App);
