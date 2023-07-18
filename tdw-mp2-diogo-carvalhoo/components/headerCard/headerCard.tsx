import React from "react";
import { IoIosPeople } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import { useDispatch, useSelector } from "react-redux";
import {
  allTeams,
  westTeams,
  eastTeams,
  filteredConference,
  changeFilteredConference,
  changeTeamsPaginatorPage,
} from "../../redux/reducers/filteredTeamsReducer";
import { CardDiv, CardBodyDiv, CardTitleH5, CardIconDiv } from "../styles/card";

type IconColorDictionary = {
  [x: string]: { color: string; "background-color": string };
};

const IconColor: IconColorDictionary = {
  Teams: { color: "#4154f1", "background-color": "#f6f6fe" },
  WST: { color: "#2eca6a", "background-color": "#e0f8e9" },
  EST: { color: "#ff771d", "background-color": "#ffecdf" },
};

interface HeaderCardProps {
  title: string;
  subTitle: string;
}

function HeaderCard({ title, subTitle }: HeaderCardProps) {
  const dispatch = useDispatch();
  const numberAllTeams = useSelector(allTeams);
  const numberWestTeams = useSelector(westTeams);
  const numberEastTeams = useSelector(eastTeams);
  const currentFilteredConference = useSelector(filteredConference);

  return (
    <CardDiv>
      <CardBodyDiv>
        <CardTitleH5>
          {title} <span>| {subTitle} </span>
        </CardTitleH5>

        <div className="d-flex align-items-center">
          <CardIconDiv>
            <IconContext.Provider value={{ color: IconColor[title]["color"] }}>
              <IoIosPeople></IoIosPeople>
            </IconContext.Provider>
          </CardIconDiv>
          <div className="ps-3">
            <h6
              style={{
                textDecoration:
                  title === "Teams" && currentFilteredConference === "all"
                    ? "underline"
                    : title === "WST" && currentFilteredConference === "West"
                    ? "underline"
                    : title === "EST" && currentFilteredConference === "East"
                    ? "underline"
                    : "none",
              }}
              onClick={() => {
                dispatch(
                  changeFilteredConference(
                    title === "Teams"
                      ? "all"
                      : title === "WST"
                      ? "West"
                      : "East"
                  )
                );
                dispatch(changeTeamsPaginatorPage(1));
              }}
            >
              {title === "Teams"
                ? numberAllTeams
                : title === "WST"
                ? numberWestTeams
                : numberEastTeams}
            </h6>
          </div>
        </div>
      </CardBodyDiv>
    </CardDiv>
  );
}

export default HeaderCard;
