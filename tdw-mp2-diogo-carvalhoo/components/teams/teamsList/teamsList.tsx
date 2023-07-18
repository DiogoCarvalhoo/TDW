import React, { useEffect } from "react";

import TeamCard from "../teamCard/teamCard";
import {
  changeAllTeams,
  changeEastTeams,
  changeFilteredTeams,
  changeWestTeams,
  filteredConference,
  filteredName,
  filteredTeams,
  teamsPaginatorPage,
} from "../../../redux/reducers/filteredTeamsReducer";
import { useDispatch, useSelector } from "react-redux";
import { IFilteredTeam } from "../../../pages/team/[id]";

interface TeamsListProps {
  teamsData: IFilteredTeam[];
}

function TeamsList({ teamsData }: TeamsListProps) {
  const dispatch = useDispatch();
  const currentFilteredTeams = useSelector(filteredTeams);
  const currentFilteredName = useSelector(filteredName);
  const currentFilteredConference = useSelector(filteredConference);
  const currentPaginatorPage = useSelector(teamsPaginatorPage);

  useEffect(() => {
    var emptyList = [];
    var westCounter = 0;
    var eastCounter = 0;
    for (let i = 0; i < teamsData.length; i++) {
      if (
        teamsData[i].allStar ||
        !teamsData[i].nbaFranchise ||
        teamsData[i].leagues.standard === undefined ||
        (teamsData[i].leagues.standard?.conference !== "West" &&
          teamsData[i].leagues.standard?.conference !== "East")
      ) {
        continue;
      }

      if (currentFilteredName !== "") {
        if (!teamsData[i].name.startsWith(currentFilteredName)) {
          continue;
        }
      }

      if (teamsData[i].leagues.standard?.conference === "West") westCounter++;
      else eastCounter++;

      if (currentFilteredConference !== "all") {
        if (
          teamsData[i].leagues.standard?.conference !==
          currentFilteredConference
        ) {
          continue;
        }
      }

      emptyList.push(teamsData[i]);
    }

    dispatch(changeFilteredTeams(emptyList));
    dispatch(changeAllTeams(eastCounter + westCounter));
    dispatch(changeEastTeams(eastCounter));
    dispatch(changeWestTeams(westCounter));
  }, [currentFilteredName, currentFilteredConference]);

  const firstRowTeams = currentFilteredTeams.slice(
    (currentPaginatorPage - 1) * 16,
    (currentPaginatorPage - 1) * 16 + 4
  );
  const secondRowTeams = currentFilteredTeams.slice(
    (currentPaginatorPage - 1) * 16 + 4,
    (currentPaginatorPage - 1) * 16 + 8
  );
  const thirdRowTeams = currentFilteredTeams.slice(
    (currentPaginatorPage - 1) * 16 + 8,
    (currentPaginatorPage - 1) * 16 + 12
  );
  const fourthRowTeams = currentFilteredTeams.slice(
    (currentPaginatorPage - 1) * 16 + 12,
    (currentPaginatorPage - 1) * 16 + 16
  );

  return (
    <div className="container">
      <div className="row">
        {firstRowTeams.map(function (teamInfo: IFilteredTeam, index: number) {
          return <TeamCard key={index} teamInfo={teamInfo}></TeamCard>;
        })}
      </div>

      <div className="row">
        {secondRowTeams.map(function (teamInfo, index) {
          return <TeamCard key={index} teamInfo={teamInfo}></TeamCard>;
        })}
      </div>

      <div className="row">
        {thirdRowTeams.map(function (teamInfo, index) {
          return <TeamCard key={index} teamInfo={teamInfo}></TeamCard>;
        })}
      </div>

      <div className="row">
        {fourthRowTeams.map(function (teamInfo, index) {
          return <TeamCard key={index} teamInfo={teamInfo}></TeamCard>;
        })}
      </div>
    </div>
  );
}

export default TeamsList;
