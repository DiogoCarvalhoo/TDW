import Image from "next/image";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { updatePollMasterInfo } from "../../redux/slices/pollMasterInfoSlice";
import styled from "styled-components";
import SideBarItem from "./sidebar_item";
import { useEffect, useState } from "react";
import { updateCurrentUserInfo } from "../../redux/slices/currentUserInfoSlice";

import {
  currentUserUsername,
  cleanCurrentUserInfo,
} from "../../redux/slices/currentUserInfoSlice";
import ErrorModal from "../utils/error_modal";

import { createUser } from "../../utils/users";

const SideBarWrapper = styled.div`
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;

  .sidebar-heading {
    padding: 0.875rem 1.25rem;
    font-size: 1.2rem;
  }

  .list-group {
    width: 15rem;
  }
`;

const SideBarHeader = styled.div`
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(90, 227, 255, 1) 100%
  );
`;

export default function SideBar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const session = useSession();

  const currentuserUsername = useSelector(currentUserUsername);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (session.data?.error === "RefreshAccessTokenError") {
      signOut();
    } else {
      if (session.status == "authenticated") {
        const getUserName = async () => {
          const response = await fetch("/api/twitter/user_info", {
            method: "GET",
          });

          if (response.status === 200) {
            const result = await response.json();
            dispatch(updateCurrentUserInfo(result.data));

            // Create user in firebase database if not created yet
            createUser(result.data.username);
          } else {
            setErrorMessage(
              "Ocorreu um erro ao obter o username da sua conta. Por favor tente novamente."
            );
          }
        };
        getUserName();
      }

      if (session.status == "unauthenticated") {
        dispatch(cleanCurrentUserInfo());
      }
    }
  }, [session.status]);

  useEffect(() => {
    const pollMasterInfo = async () => {
      const masterData = await fetch("/api/twitter/poll_master_info", {
        method: "GET",
      }).then((res) => res.json());

      dispatch(updatePollMasterInfo(masterData.data));
    };

    pollMasterInfo();
  }, []);

  return (
    <>
      <SideBarWrapper className={`bg-white`} id="sidebar-wrapper">
        <SideBarHeader
          className={`sidebar-heading text-center py-4 fs-4 fw-bold text-uppercase`}
        >
          <Image
            id="logo"
            src="/img/logo-no-background.png"
            alt={"uno logo"}
            height={25.2}
            width={200}
          />
        </SideBarHeader>
        <div className="list-group list-group-flush my-3">
          <SideBarItem item="home" active={router.pathname === "/"} />
          <SideBarItem item="polls" active={router.pathname === "/polls"} />
          <SideBarItem
            item="new_poll"
            authenticated={session.status == "authenticated"}
            active={router.pathname === "/new_poll"}
          />
          {session.status === "unauthenticated" && (
            <>
              <SideBarItem item="login" active={false} />
            </>
          )}
          {session.status === "authenticated" && (
            <>
              <SideBarItem
                item="profile"
                userName={currentuserUsername}
                active={router.pathname === "/profile"}
              />
              <SideBarItem item="logout" active={false} />
            </>
          )}
        </div>
      </SideBarWrapper>
      <ErrorModal
        message={errorMessage}
        onHide={() => setErrorMessage("")}
        show={errorMessage !== ""}
      />
    </>
  );
}
