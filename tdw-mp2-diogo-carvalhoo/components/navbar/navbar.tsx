import React, { useRef } from "react";
import styled from "styled-components";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  changeFilteredName,
  changeTeamsPaginatorPage,
} from "../../redux/reducers/filteredTeamsReducer";
import { useRouter } from "next/router";

const HeaderDiv = styled.div`
  height: 60px;
  box-shadow: 0px 2px 20px rgba(1, 41, 112, 0.1);
  background-color: #fff;
  padding-left: 20px;
  position: fixed;
  top: 0;

  .toggle-sidebar-btn {
    font-size: 32px;
    padding-left: 10px;
    cursor: pointer;
    color: #012970;
  }
`;

const Logo = styled.div`
  color: #4154f1;
  text-decoration: none;
  line-height: 1;

  > img {
    max-height: 26px;
    margin-right: 6px;
  }

  > span {
    font-size: 26px;
    font-weight: 700;
    color: #012970;
    font-family: "Nunito", sans-serif;
  }

  :hover {
    color: #717ff5;
    text-decoration: none;
  }
`;

const SearchBarDiv = styled.div`
  min-width: 360px;
  padding: 0 20px;
  align-items: center;
`;

const SearchBarForm = styled.form`
  width: 100%;
`;

const SearchBarFormInput = styled.input`
  border: 0;
  font-size: 14px;
  color: #012970;
  border: 1px solid rgba(1, 41, 112, 0.2);
  padding: 7px 38px 7px 8px;
  border-radius: 3px;
  transition: 0.3s;
  width: 100%;

  :focus,
  :hover {
    outline: none;
    box-shadow: 0 0 10px 0 rgba(1, 41, 112, 0.15);
    border: 1px solid rgba(1, 41, 112, 0.3);
  }
`;

const SearchBarFormButton = styled.button`
  border: 0;
  padding: 0;
  margin-left: -30px;
  background: none;
`;

function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchBarInputRef = useRef<HTMLInputElement>(null);

  const toggleSideBar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };

  return (
    <HeaderDiv id="header" className="fixed-top d-flex align-items-center">
      <AiOutlineMenu
        className="toggle-sidebar-btn"
        onClick={() => toggleSideBar()}
      ></AiOutlineMenu>
      <div className="d-flex align-items-center justify-content-between">
        <Link href="/">
          <Logo className="d-flex align-items-center">
            <Image
              src="/logo.png"
              width={50}
              height={25}
              alt="Logo Image"
            ></Image>
            <span className="d-none d-lg-block">NBAFollowers</span>
          </Logo>
        </Link>
      </div>
      {router.pathname === "/teams" ? (
        <SearchBarDiv>
          <SearchBarForm
            className="search-form d-flex"
            onSubmit={(event) => {
              event.preventDefault();
              dispatch(
                changeFilteredName(
                  searchBarInputRef.current
                    ? searchBarInputRef.current?.value
                    : ""
                )
              );
              dispatch(changeTeamsPaginatorPage(1));
            }}
          >
            <SearchBarFormInput
              type="text"
              placeholder="Search for team"
              ref={searchBarInputRef}
            />
            <SearchBarFormButton type="submit" title="Search">
              <AiOutlineSearch></AiOutlineSearch>
            </SearchBarFormButton>
          </SearchBarForm>
        </SearchBarDiv>
      ) : null}
    </HeaderDiv>
  );
}

export default Navbar;
