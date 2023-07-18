import React from "react";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { BsQuestionLg } from "react-icons/bs";
import { GiGamepad } from "react-icons/gi";
import Link from "next/link";
import { useRouter } from "next/router";

const SidebarASide = styled.aside`
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 300px;
  z-index: 996;
  transition: all 0.3s;
  padding: 20px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #aab7cf transparent;
  box-shadow: 0px 0px 20px rgba(1, 41, 112, 0.1);
  background-color: #fff;

  .sidebar-nav {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .sidebar-nav li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .sidebar-nav .nav-item {
    margin-bottom: 5px;
  }

  .sidebar-nav .nav-heading {
    font-size: 11px;
    text-transform: uppercase;
    color: #899bbd;
    font-weight: 600;
    margin: 10px 0 5px 15px;
  }

  .sidebar-nav .nav-link {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    color: #4154f1;
    transition: 0.3;
    background: #f6f9ff;
    padding: 10px 15px;
    border-radius: 4px;
  }

  .sidebar-nav .nav-link.collapsed {
    color: #012970;
    background: #fff;
  }

  .sidebar-nav .nav-link:hover {
    color: #4154f1;
    background: #f6f9ff;
  }
`;

function Sidebar() {
  const router = useRouter();

  return (
    <SidebarASide id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link
            className={
              router.pathname === "/" ? "nav-link" : "nav-link collapsed"
            }
            href="/"
          >
            <i>
              {" "}
              <FaHome></FaHome>{" "}
            </i>
            <span>HomePage</span>
          </Link>
        </li>

        <li className="nav-heading">Pages</li>

        <li className="nav-item">
          <Link
            className={
              router.pathname === "/teams" ? "nav-link" : "nav-link collapsed"
            }
            href="/teams"
          >
            <i>
              {" "}
              <IoIosPeople></IoIosPeople>
            </i>
            <span>Teams</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={
              router.pathname === "/login" ? "nav-link" : "nav-link collapsed"
            }
            href="/login"
          >
            <i>
              {" "}
              <GiGamepad></GiGamepad>
            </i>
            <span>Mini Game</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={
              router.pathname === "/aboutus" ? "nav-link" : "nav-link collapsed"
            }
            href="/aboutus"
          >
            <i>
              {" "}
              <BsQuestionLg></BsQuestionLg>
            </i>
            <span>About Us</span>
          </Link>
        </li>
      </ul>
    </SidebarASide>
  );
}

export default Sidebar;
