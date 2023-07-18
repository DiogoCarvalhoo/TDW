import React from "react";
import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  teamsPaginatorPage,
  changeTeamsPaginatorPage,
  filteredTeams,
} from "../../redux/reducers/filteredTeamsReducer";
import {
  playersPaginatorPage,
  changePlayersPaginatorPage,
  filteredPlayers,
} from "../../redux/reducers/playersReducer";

interface PaginatorProps {
  current_page: string;
}

function Paginator({ current_page }: PaginatorProps) {
  const dispatch = useDispatch();
  const currentTeamsPageNumber = useSelector(teamsPaginatorPage);
  const currentPlayersPageNumber = useSelector(playersPaginatorPage);
  const currentFilteredTeams = useSelector(filteredTeams);
  const currentFilteredPlayers = useSelector(filteredPlayers);

  const lastPage =
    current_page === "Teams"
      ? Math.ceil(currentFilteredTeams.length / 16)
      : Math.ceil(currentFilteredPlayers.length / 12);

  return (
    <Pagination>
      <Pagination.First
        onClick={() =>
          dispatch(
            current_page === "Teams"
              ? changeTeamsPaginatorPage(1)
              : changePlayersPaginatorPage(1)
          )
        }
      />
      <Pagination.Prev
        disabled={
          current_page === "Teams"
            ? currentTeamsPageNumber < 2
              ? true
              : false
            : currentPlayersPageNumber < 2
            ? true
            : false
        }
        onClick={() =>
          dispatch(
            current_page === "Teams"
              ? changeTeamsPaginatorPage(currentTeamsPageNumber - 1)
              : changePlayersPaginatorPage(currentPlayersPageNumber - 1)
          )
        }
      />

      <Pagination.Item
        disabled={
          current_page === "Teams"
            ? currentTeamsPageNumber < 3
              ? true
              : false
            : currentPlayersPageNumber < 3
            ? true
            : false
        }
        onClick={() =>
          dispatch(
            current_page === "Teams"
              ? changeTeamsPaginatorPage(currentTeamsPageNumber - 2)
              : changePlayersPaginatorPage(currentPlayersPageNumber - 2)
          )
        }
      >
        {current_page === "Teams"
          ? currentTeamsPageNumber - 2
          : currentPlayersPageNumber - 2}
      </Pagination.Item>
      <Pagination.Item
        disabled={
          current_page === "Teams"
            ? currentTeamsPageNumber < 2
              ? true
              : false
            : currentPlayersPageNumber < 2
            ? true
            : false
        }
        onClick={() =>
          dispatch(
            current_page === "Teams"
              ? changeTeamsPaginatorPage(currentTeamsPageNumber - 1)
              : changePlayersPaginatorPage(currentPlayersPageNumber - 1)
          )
        }
      >
        {current_page === "Teams"
          ? currentTeamsPageNumber - 1
          : currentPlayersPageNumber - 1}
      </Pagination.Item>
      <Pagination.Item active={true}>
        {current_page === "Teams"
          ? currentTeamsPageNumber
          : currentPlayersPageNumber}
      </Pagination.Item>
      <Pagination.Item
        disabled={
          current_page == "Teams"
            ? currentTeamsPageNumber + 1 > lastPage
              ? true
              : false
            : currentPlayersPageNumber + 1 > lastPage
            ? true
            : false
        }
        onClick={() =>
          dispatch(
            current_page === "Teams"
              ? changeTeamsPaginatorPage(currentTeamsPageNumber + 1)
              : changePlayersPaginatorPage(currentPlayersPageNumber + 1)
          )
        }
      >
        {current_page === "Teams"
          ? currentTeamsPageNumber + 1
          : currentPlayersPageNumber + 1}
      </Pagination.Item>
      <Pagination.Item
        disabled={
          current_page === "Teams"
            ? currentTeamsPageNumber + 2 > lastPage
              ? true
              : false
            : currentPlayersPageNumber + 2 > lastPage
            ? true
            : false
        }
        onClick={() =>
          dispatch(
            current_page === "Teams"
              ? changeTeamsPaginatorPage(currentTeamsPageNumber + 2)
              : changePlayersPaginatorPage(currentPlayersPageNumber + 2)
          )
        }
      >
        {current_page === "Teams"
          ? currentTeamsPageNumber + 2
          : currentPlayersPageNumber + 2}
      </Pagination.Item>

      <Pagination.Next
        disabled={
          current_page === "Teams"
            ? currentTeamsPageNumber + 1 > lastPage
              ? true
              : false
            : currentPlayersPageNumber + 1 > lastPage
            ? true
            : false
        }
        onClick={() =>
          dispatch(
            current_page === "Teams"
              ? changeTeamsPaginatorPage(currentTeamsPageNumber + 1)
              : changePlayersPaginatorPage(currentPlayersPageNumber + 1)
          )
        }
      />
      <Pagination.Last
        onClick={() =>
          dispatch(
            current_page === "Teams"
              ? changeTeamsPaginatorPage(lastPage)
              : changePlayersPaginatorPage(lastPage)
          )
        }
      />
    </Pagination>
  );
}

export default Paginator;
