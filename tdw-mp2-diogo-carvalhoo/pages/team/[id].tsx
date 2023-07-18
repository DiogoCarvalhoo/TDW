import React from "react";

import PageTitle from "../../components/pagetitle/pagetitle";
import { GetServerSideProps } from "next";
import TeamLogo from "../../components/teams/teamLogo/teamLogo";
import TeamInfo from "../../components/teams/teamInfo/teamInfo";
import { useDispatch } from "react-redux";
import {
  changeFilteredPlayers,
  changePlayersPaginatorPage,
} from "../../redux/reducers/playersReducer";

export interface IFilteredTeam {
  id: number;
  name: string;
  nickname: string;
  code: string;
  city: string;
  logo: string | null;
  allStar: boolean;
  nbaFranchise: boolean;
  leagues: {
    [key: string]:
      | {
          [key: string]: string | null | undefined;
        }
      | undefined
      | null;
  };
}

export interface IFilteredPlayer {
  id: number;
  firstname: string;
  lastname: string;
  birth: { [key: string]: string | null };
  nba: { [key: string]: number };
  height: { [key: string]: string };
  weight: { [key: string]: string };
  college: string;
  affiliation: string | null;
  leagues: {
    [key: string]: { [key: string]: number | string | boolean | null };
  };
}

interface TeamProps {
  teamInfo: IFilteredTeam;
  teamStats: { [key: string]: string | number };
  teamPlayers: Array<IFilteredPlayer>;
}

export default function Team({ teamInfo, teamStats, teamPlayers }: TeamProps) {
  const dispatch = useDispatch();
  dispatch(changeFilteredPlayers(teamPlayers));
  dispatch(changePlayersPaginatorPage(1));

  return (
    <>
      <PageTitle
        currentPage={"Team"}
        currentPageHref={"/team/" + teamInfo.id}
        previousPage={"Teams"}
        previousPageHref={"/teams"}
      ></PageTitle>

      <div className="row">
        <div className="col-xl-4">
          <TeamLogo teamInfo={teamInfo}></TeamLogo>
        </div>

        <div className="col-xl-8">
          <TeamInfo
            teamInfo={teamInfo}
            teamStats={teamStats}
            teamPlayers={teamPlayers}
          ></TeamInfo>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;

  const team_request_res = await fetch(
    "https://api-nba-v1.p.rapidapi.com/teams?id=" + id,
    {
      headers: {
        "X-RapidAPI-Key": "ce2a9741fbmshc7f82170a3ebc45p133e91jsn43e9d15777bc",
        "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      },
    }
  );
  const teamData = await team_request_res.json();

  const stats_request_res = await fetch(
    "https://api-nba-v1.p.rapidapi.com/teams/statistics?id=" +
      id +
      "&season=2021",
    {
      headers: {
        "X-RapidAPI-Key": "ce2a9741fbmshc7f82170a3ebc45p133e91jsn43e9d15777bc",
        "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      },
    }
  );
  const statsData = await stats_request_res.json();

  const players_request_res = await fetch(
    "https://api-nba-v1.p.rapidapi.com/players?team=" + id + "&season=2021",
    {
      headers: {
        "X-RapidAPI-Key": "ce2a9741fbmshc7f82170a3ebc45p133e91jsn43e9d15777bc",
        "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      },
    }
  );
  const playersData = await players_request_res.json();

  return {
    props: {
      teamInfo: teamData.response[0],
      teamStats: statsData.response[0],
      teamPlayers: playersData.response,
    },
  };
};
