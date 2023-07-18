import React from "react";
import { useSelector } from "react-redux";
import { IFilteredPlayer } from "../../../pages/team/[id]";
import { playersPaginatorPage } from "../../../redux/reducers/playersReducer";
import PlayerCard from "../playerCard/playerCard";

interface PlayersListProps {
  teamPlayers: Array<IFilteredPlayer>;
}

function PlayersList({ teamPlayers }: PlayersListProps) {
  const currentPaginatorPage = useSelector(playersPaginatorPage);

  const firstRowPlayers = teamPlayers.slice(
    (currentPaginatorPage - 1) * 12,
    (currentPaginatorPage - 1) * 12 + 3
  );
  const secondRowPlayers = teamPlayers.slice(
    (currentPaginatorPage - 1) * 12 + 3,
    (currentPaginatorPage - 1) * 12 + 6
  );
  const thirdRowPlayers = teamPlayers.slice(
    (currentPaginatorPage - 1) * 12 + 6,
    (currentPaginatorPage - 1) * 12 + 9
  );

  return (
    <div className="container">
      <div className="row">
        {firstRowPlayers.map(function (
          playerInfo: IFilteredPlayer,
          index: number
        ) {
          return <PlayerCard key={index} playerInfo={playerInfo}></PlayerCard>;
        })}
      </div>

      <div className="row">
        {secondRowPlayers.map(function (playerInfo, index) {
          return <PlayerCard key={index} playerInfo={playerInfo}></PlayerCard>;
        })}
      </div>

      <div className="row">
        {thirdRowPlayers.map(function (playerInfo, index) {
          return <PlayerCard key={index} playerInfo={playerInfo}></PlayerCard>;
        })}
      </div>
    </div>
  );
}

export default PlayersList;
