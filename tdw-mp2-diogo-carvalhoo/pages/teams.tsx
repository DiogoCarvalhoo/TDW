import React from "react";

import PageTitle from "../components/pagetitle/pagetitle";
import HeaderCard from "../components/headerCard/headerCard";
import { CardDiv, CardBodyDiv, CardTitleH5 } from "../components/styles/card";
import TeamsList from "../components/teams/teamsList/teamsList";
import Paginator from "../components/paginator/paginator";
import { GetServerSideProps } from "next";
import { IFilteredTeam } from "./team/[id]";

const HeaderCardsInfo: { title: string; subTitle: string }[] = [
  { title: "Teams", subTitle: "Number of NBA Teams" },
  { title: "WST", subTitle: "Western Conference Teams" },
  { title: "EST", subTitle: "Eastern Conference Teams" },
];

interface TeamsProps {
  teamsData: IFilteredTeam[];
}

export default function Teams({ teamsData }: TeamsProps) {
  return (
    <>
      <PageTitle
        currentPage={"Teams"}
        currentPageHref={"/teams"}
        previousPage={"Home"}
        previousPageHref={"/"}
      ></PageTitle>

      <div className="row">
        {HeaderCardsInfo.map(function (headerCardInfo, index) {
          return (
            <div key={index} className="col-xxl-4 col-md-6">
              <HeaderCard
                key={headerCardInfo.title}
                title={headerCardInfo.title}
                subTitle={headerCardInfo.subTitle}
              ></HeaderCard>
            </div>
          );
        })}

        <div className="col-12">
          <CardDiv>
            <CardBodyDiv>
              <CardTitleH5>
                Teams <span>| Season 2022/2023</span>
              </CardTitleH5>
              <TeamsList teamsData={teamsData}></TeamsList>
              <Paginator current_page={"Teams"}></Paginator>
            </CardBodyDiv>
          </CardDiv>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const teams_request_res = await fetch(
    "https://api-nba-v1.p.rapidapi.com/teams",
    {
      headers: {
        "X-RapidAPI-Key": "ce2a9741fbmshc7f82170a3ebc45p133e91jsn43e9d15777bc",
        "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      },
    }
  );
  const teamsData = await teams_request_res.json();

  return {
    props: {
      teamsData: teamsData.response,
    },
  };
};
