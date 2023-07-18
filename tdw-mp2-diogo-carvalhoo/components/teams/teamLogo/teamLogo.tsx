import React from "react";
import { CardDiv, CardBodyDiv, CardTitleH5 } from "../../styles/card";
import { IFilteredTeam } from "../../../pages/team/[id]";
import styled from "styled-components";
import Image from "next/image";

const TeamLogoH2 = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c384e;
  margin: 10px 0 0 0;
`;

const TeamLogoH3 = styled.h3`
  font-size: 18px;
`;

interface TeamLogoProps {
  teamInfo: IFilteredTeam;
}

function TeamLogo({ teamInfo }: TeamLogoProps) {
  const myLoader = ({}) => {
    return `${teamInfo.logo !== null ? teamInfo.logo : ""}`;
  };

  return (
    <CardDiv>
      <CardBodyDiv className="pt-4 d-flex flex-column">
        <Image
          loader={myLoader}
          alt="Team Logo Image"
          src={teamInfo.logo !== null ? teamInfo.logo : ""}
          width={200}
          height={200}
        />

        <TeamLogoH2>{teamInfo.name}</TeamLogoH2>
        <TeamLogoH3>
          {teamInfo.leagues.standard?.conference
            ? teamInfo.leagues.standard.conference
            : ""}
        </TeamLogoH3>
      </CardBodyDiv>
    </CardDiv>
  );
}

export default TeamLogo;
