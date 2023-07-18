// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {
  faHouse,
  faPoll,
  faPlus,
  faUser,
  faRightToBracket,
  faRightFromBracket,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";

import { signIn, signOut } from "next-auth/react";
import { useCallback } from "react";

const ListItem = styled(Link)`
  border: none;
  padding: 20px 30px;
  font-size: 18px;
  color: var(--second-text-color);
  text-decoration: none;
  position: relative;
  font-weight: bold;

  &.active {
    background-color: transparent;
    color: var(--main-text-color);
  }

  &:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }
`;

const SessionLinkItem = styled.div`
  border: none;
  padding: 20px 30px;
  font-size: 18px;
  color: var(--second-text-color);
  text-decoration: none;
  position: relative;
  font-weight: bold;

  &.active {
    background-color: transparent;
    color: var(--main-text-color);
  }

  &:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  &:hover {
    cursor: pointer;
  }
`;

const pages = new Map<string, { icon: IconProp; text: string; path: string }>([
  [
    "home",
    {
      icon: faHouse,
      text: "Página inicial",
      path: "/",
    },
  ],
  [
    "polls",
    {
      icon: faPoll,
      text: "Polls",
      path: "/polls",
    },
  ],
  [
    "new_poll",
    {
      icon: faPlus,
      text: "Nova Poll",
      path: "/new_poll",
    },
  ],
  [
    "login",
    {
      icon: faRightToBracket,
      text: "Iniciar sessão",
      path: "/login",
    },
  ],
  [
    "profile",
    {
      icon: faUser,
      text: "Perfil",
      path: "/profile",
    },
  ],
  [
    "logout",
    {
      icon: faRightFromBracket,
      text: "Sair",
      path: "/login",
    },
  ],
]);

export default function SideBarItem({
  item,
  active,
  userName,
  authenticated,
}: {
  item: string;
  active: boolean;
  userName?: string;
  authenticated?: boolean;
}) {
  let icon = pages.get(item)?.icon;
  if (icon === undefined) {
    icon = faCircleInfo;
  }
  let path = pages.get(item)?.path;
  if (path === undefined) {
    path = "/error";
  }

  const login = useCallback(() => signIn(), []);
  const logout = useCallback(() => signOut(), []);

  let content;
  if (item === "login" || (item === "new_poll" && !authenticated)) {
    content = (
      <SessionLinkItem
        onClick={login}
        className={
          active
            ? "list-group list-group-item-action bg-transparent second-text flex-row align-items-center active"
            : "list-group list-group-item-action bg-transparent second-text flex-row align-items-center"
        }
      >
        <FontAwesomeIcon icon={icon} className="me-2 " />
        {pages.get(item)?.text}
      </SessionLinkItem>
    );
  } else if (item === "logout") {
    content = (
      <SessionLinkItem
        onClick={logout}
        className={
          active
            ? "list-group list-group-item-action bg-transparent second-text flex-row align-items-center active"
            : "list-group list-group-item-action bg-transparent second-text flex-row align-items-center"
        }
      >
        <FontAwesomeIcon icon={icon} className="me-2 " />
        {pages.get(item)?.text}
      </SessionLinkItem>
    );
  } else {
    content = (
      <ListItem
        href={path}
        className={
          active
            ? "list-group list-group-item-action bg-transparent second-text flex-row align-items-center active"
            : "list-group list-group-item-action bg-transparent second-text flex-row align-items-center"
        }
      >
        <FontAwesomeIcon icon={icon} className="me-2 " />
        {item === "profile" && userName}
        {item !== "profile" && pages.get(item)?.text}
      </ListItem>
    );
  }

  return content;
}
