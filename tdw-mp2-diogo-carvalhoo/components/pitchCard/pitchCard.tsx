import React, { useRef } from "react";
import { secondAPIPlayer } from "../../pages/game/[username]";
import { cardPlayer } from "../basketPitch/basketPitch";
import { CardDiv, CardBodyDiv } from "../styles/card";
import Image from "next/image";

interface PitchCard {
  playersList: secondAPIPlayer[];
  player: cardPlayer;
  position: string;
  setPlayer: React.Dispatch<React.SetStateAction<cardPlayer>>;
}

function PitchCard({ playersList, player, position, setPlayer }: PitchCard) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePlayerChange = () => {
    const new_player = inputRef.current?.value;

    if (new_player === undefined || new_player?.length < 3) {
      return;
    }

    for (let i = 0; i < playersList.length; i++) {
      let fullName = playersList[i].firstName + " " + playersList[i].lastName;
      if (new_player === fullName) {
        setPlayer({ playerId: playersList[i].personId, playerName: fullName });
        return;
      }
    }
  };

  return (
    <CardDiv style={{ width: "12rem" }}>
      <object
        className="card-img-top"
        data={
          player.playerId !== "-1"
            ? "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" +
              player.playerId +
              ".png"
            : "/defaultPlayer.png"
        }
        type="image/png"
      >
        <Image
          className="card-img-top"
          alt={position + "side player image "}
          src="/defaultPlayer.png"
          objectFit="contain"
          layout="responsive"
          width={100}
          height={100}
        />
      </object>

      <CardBodyDiv>
        <p className="card-text">Select your {position} player:</p>
        <input
          type="text"
          className="form-control"
          aria-label="Username"
          aria-describedby="basic-addon1"
          list={"player_list" + position}
          ref={inputRef}
          onChange={() => {
            handlePlayerChange();
          }}
          placeholder={player.playerId !== "-1" ? player.playerName : ""}
        />
        <datalist id={"player_list" + position}>
          {playersList.map(function (element, index) {
            return (
              <option key={index}>
                {element.firstName} {element.lastName}
              </option>
            );
          })}
        </datalist>
      </CardBodyDiv>
    </CardDiv>
  );
}

export default PitchCard;
