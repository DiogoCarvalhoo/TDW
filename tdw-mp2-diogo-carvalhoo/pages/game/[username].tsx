import React, { useState } from "react";

import PageTitle from "../../components/pagetitle/pagetitle";
import { GetServerSideProps } from "next";
import BasketPitch from "../../components/basketPitch/basketPitch";
import {
  CardDiv,
  CardBodyDiv,
  CardTitleH5,
} from "../../components/styles/card";
import teams_translate_ids from "../../data/teamsData";
import { GrFormClose } from "react-icons/gr";

export type secondAPIPlayer = {
  firstName: string;
  lastName: string;
  temporaryDisplayName: string;
  personId: string;
  teamId: string;
  jersey: string;
  isActive: boolean;
  pos: string;
  heightFeet: string;
  heightInches: string;
  heightMeters: string;
  weightPounds: string;
  weightKilograms: string;
  dateOfBirthUTC: string;
  teamSitesOnly: { [key: string]: string };
  teams: [];
  draft: {};
  nbaDebutYear: string;
  yearsPro: string;
  collegeName: string;
  lastAffiliation: string;
  country: string;
};

interface GameProps {
  username: string;
  players_forward_left: secondAPIPlayer[];
  players_forward_right: secondAPIPlayer[];
  players_center: secondAPIPlayer[];
  players_guard_left: secondAPIPlayer[];
  players_guard_right: secondAPIPlayer[];
}

export default function Game({
  username,
  players_forward_left,
  players_forward_right,
  players_center,
  players_guard_left,
  players_guard_right,
}: GameProps) {
  const [teamError, setTeamError] = useState<boolean>(false);

  return (
    <>
      <PageTitle
        currentPage={"Game"}
        currentPageHref={"/game/" + username}
        previousPage={"Login"}
        previousPageHref={"/login"}
      ></PageTitle>

      {teamError ? (
        <div className="alert alert-danger" role="alert">
          Your team is not complete! You must select a different player for each
          position.
          <GrFormClose
            style={{ position: "absolute", right: "10px" }}
            onClick={() => setTeamError(false)}
          ></GrFormClose>
        </div>
      ) : null}

      <CardDiv>
        <CardBodyDiv>
          <CardTitleH5>
            Game <span>| Pitch</span>
          </CardTitleH5>
          <BasketPitch
            username={username}
            players_forward_left={players_forward_left}
            players_forward_right={players_forward_right}
            players_center={players_center}
            players_guard_left={players_guard_left}
            players_guard_right={players_guard_right}
            setTeamError={setTeamError}
          ></BasketPitch>
        </CardBodyDiv>
      </CardDiv>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.query.username;

  const players_request_res = await fetch(
    "https://data.nba.net/10s/prod/v1/2022/players.json"
  );
  const playersRawData = await players_request_res.json();

  const playersDuplicatedData = [
    ...playersRawData.league.sacramento,
    ...playersRawData.league.standard,
    ...playersRawData.league.utah,
    ...playersRawData.league.vegas,
  ];

  var players_forward_left: secondAPIPlayer[] = [];
  var players_forward_right: secondAPIPlayer[] = [];
  var players_center: secondAPIPlayer[] = [];
  var players_guard_left: secondAPIPlayer[] = [];
  var players_guard_right: secondAPIPlayer[] = [];
  var players_already_added = new Set();

  for (let i = 0; i < playersDuplicatedData.length; i++) {
    // Remove duplicated players
    if (
      !players_already_added.has(playersDuplicatedData[i].personId) &&
      playersDuplicatedData[i].teamId in teams_translate_ids
    ) {
      players_already_added.add(playersDuplicatedData[i].personId);
      if (playersDuplicatedData[i].pos.includes("G")) {
        players_guard_left.push(playersDuplicatedData[i]);
        players_guard_right.push(playersDuplicatedData[i]);
      }
      if (playersDuplicatedData[i].pos.includes("F")) {
        players_forward_left.push(playersDuplicatedData[i]);
        players_forward_right.push(playersDuplicatedData[i]);
      }
      if (playersDuplicatedData[i].pos.includes("C")) {
        players_center.push(playersDuplicatedData[i]);
      }
    }
  }

  return {
    props: {
      username: username,
      players_forward_left: players_forward_left,
      players_forward_right: players_forward_right,
      players_center: players_center,
      players_guard_left: players_guard_left,
      players_guard_right: players_guard_right,
    },
  };
};
