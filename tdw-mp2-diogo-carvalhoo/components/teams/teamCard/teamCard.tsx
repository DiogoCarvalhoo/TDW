import React from "react";
import { CardDiv, CardBodyDiv, CardTitleH5 } from "../../styles/card";
import { IFilteredTeam } from "../../../pages/team/[id]";
import { useRouter } from "next/router";
import Image from "next/image";

interface TeamCardProps {
  teamInfo: IFilteredTeam;
}

function TeamCard({ teamInfo }: TeamCardProps) {
  const router = useRouter();

  const myLoader = ({}) => {
    return `${teamInfo.logo !== null ? teamInfo.logo : ""}`;
  };

  return (
    <div className="col-lg-3 col-md-6">
      <CardDiv
        style={{ maxHeight: "340px" }}
        onClick={() => router.push("/team/" + teamInfo.id)}
      >
        <Image
          className="team-card-img"
          loader={myLoader}
          alt="Team Card Logo Image"
          src={teamInfo.logo !== null ? teamInfo.logo : ""}
          width={295.5}
          height={295.5}
        />

        <CardBodyDiv>
          <CardTitleH5>{teamInfo.name}</CardTitleH5>
        </CardBodyDiv>
      </CardDiv>
    </div>
  );
}

export default TeamCard;
