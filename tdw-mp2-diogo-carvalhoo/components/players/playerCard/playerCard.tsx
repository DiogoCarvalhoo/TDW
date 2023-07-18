import React from "react";
import { CardDiv, CardBodyDiv, CardTitleH5 } from "../../styles/card";
import { IFilteredPlayer } from "../../../pages/team/[id]";
import Image from "next/image";

interface PlayerCardProps {
  playerInfo: IFilteredPlayer;
}

function PlayerCard({ playerInfo }: PlayerCardProps) {
  return (
    <div className="col-lg-4 col-md-6">
      <CardDiv style={{ maxHeight: "340px" }}>
        <Image
          alt="Player Image"
          src="/defaultPlayer.png"
          layout="responsive"
          objectFit="contain"
          width={100}
          height={100}
        />

        <CardBodyDiv>
          <CardTitleH5>
            {playerInfo.firstname + " " + playerInfo.lastname}
          </CardTitleH5>
        </CardBodyDiv>
      </CardDiv>
    </div>
  );
}

export default PlayerCard;
