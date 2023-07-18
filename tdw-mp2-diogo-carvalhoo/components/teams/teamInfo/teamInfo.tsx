import React, { useState } from "react";
import { CardDiv, CardBodyDiv, CardTitleH5 } from "../../styles/card";
import { IFilteredTeam } from "../../../pages/team/[id]";
import styled from "styled-components";
import { IFilteredPlayer } from "../../../pages/team/[id]";
import PlayersList from "../../players/playersList/playersList";
import Paginator from "../../paginator/paginator";

const TeamInfoUl = styled.ul`
  border-bottom: 2px solid #ebeef4;

  .nav-link {
    margin-bottom: -2px;
    border: none;
    color: #2c384e;
  }

  .nav-link:hover,
  .nav-link:focus {
    color: #4154f1;
  }

  .nav-link.active {
    background-color: #fff;
    color: #4154f1;
    border-bottom: 2px solid #4154f1;
  }
`;

const TeamInfoProfileDiv = styled.div`
  .row {
    margin-bottom: 20px;
    font-size: 15px;
  }

  .label {
    font-weight: 600;
    color: rgba(1, 41, 112, 0.6);
  }
`;

interface TeamInfoProps {
  teamInfo: IFilteredTeam;
  teamStats: { [key: string]: string | number };
  teamPlayers: Array<IFilteredPlayer>;
}

function TeamInfo({ teamInfo, teamStats, teamPlayers }: TeamInfoProps) {
  const [currentTab, setCurrentTab] = useState<string>("Overview");

  return (
    <CardDiv>
      <CardBodyDiv className="pt-3">
        <TeamInfoUl className="nav nav-tabs">
          <li>
            <button
              className={
                currentTab === "Overview" ? "nav-link active" : "nav-link"
              }
              onClick={() => {
                setCurrentTab("Overview");
              }}
            >
              Overview
            </button>
          </li>

          <li>
            <button
              className={
                currentTab === "Roster" ? "nav-link active" : "nav-link"
              }
              onClick={() => {
                setCurrentTab("Roster");
              }}
            >
              Roster
            </button>
          </li>

          <li>
            <button
              className={
                currentTab === "Stats" ? "nav-link active" : "nav-link"
              }
              onClick={() => {
                setCurrentTab("Stats");
              }}
            >
              Stats
            </button>
          </li>
        </TeamInfoUl>

        {currentTab === "Overview" ? (
          <TeamInfoProfileDiv>
            <CardTitleH5>Profile Details</CardTitleH5>

            <div className="row">
              <div className="col-lg-3 col-md-4 label">Id</div>
              <div className="col-lg-9 col-md-8">{teamInfo.id}</div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-4 label">Name</div>
              <div className="col-lg-9 col-md-8">{teamInfo.name}</div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-4 label">Nickname</div>
              <div className="col-lg-9 col-md-8">{teamInfo.nickname}</div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-4 label">Tricode</div>
              <div className="col-lg-9 col-md-8">{teamInfo.code}</div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-4 label">City</div>
              <div className="col-lg-9 col-md-8">{teamInfo.city}</div>
            </div>
          </TeamInfoProfileDiv>
        ) : null}

        {currentTab === "Roster" ? (
          <div className="pt-3">
            <PlayersList teamPlayers={teamPlayers}></PlayersList>
            <Paginator current_page="team"></Paginator>
          </div>
        ) : null}

        {currentTab === "Stats" ? (
          <div className="pt-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"># Stat</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(teamStats).map((key, index) => {
                  return (
                    <tr key={index}>
                      <th>{key}</th>
                      <td>{teamStats[key]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
      </CardBodyDiv>
    </CardDiv>
  );
}

export default TeamInfo;
