import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { secondAPIPlayer } from "../../pages/game/[username]";
import LocalStorage from "../../utils/localStorage";
import PitchCard from "../pitchCard/pitchCard";

export interface cardPlayer {
  playerId: string;
  playerName: string;
}

interface BasketPicthProps {
  username: string;
  players_forward_left: secondAPIPlayer[];
  players_forward_right: secondAPIPlayer[];
  players_center: secondAPIPlayer[];
  players_guard_left: secondAPIPlayer[];
  players_guard_right: secondAPIPlayer[];
  setTeamError: React.Dispatch<React.SetStateAction<boolean>>;
}

function BasketPitch({
  username,
  players_forward_left,
  players_forward_right,
  players_center,
  players_guard_left,
  players_guard_right,
  setTeamError,
}: BasketPicthProps) {
  const localStorage = LocalStorage();
  const router = useRouter();

  const [forward_left, setForwardLeft] = useState<cardPlayer>({
    playerId: "-1",
    playerName: "",
  });
  const [forward_right, setForwardRight] = useState<cardPlayer>({
    playerId: "-1",
    playerName: "",
  });
  const [center, setCenter] = useState<cardPlayer>({
    playerId: "-1",
    playerName: "",
  });
  const [guard_left, setGuardLeft] = useState<cardPlayer>({
    playerId: "-1",
    playerName: "",
  });
  const [guard_right, setGuardRight] = useState<cardPlayer>({
    playerId: "-1",
    playerName: "",
  });

  const handleConfirmTeam = () => {
    if (
      forward_left.playerId === "-1" ||
      forward_right.playerId === "-1" ||
      center.playerId === "-1" ||
      guard_left.playerId === "-1" ||
      guard_right.playerId === "-1"
    ) {
      setTeamError(true);
      return;
    }

    if (forward_left.playerId === forward_right.playerId) {
      setTeamError(true);
      return;
    }

    if (guard_left.playerId === guard_right.playerId) {
      setTeamError(true);
      return;
    }

    setTeamError(false);
    localStorage.setItem(
      username,
      JSON.stringify({
        forward_left: forward_left,
        forward_right: forward_right,
        center: center,
        guard_left: guard_left,
        guard_right: guard_right,
      })
    );

    const finalScore = Math.floor(Math.random() * (50 - 0 + 1));

    const usersData = localStorage.getItem("users");
    if (usersData) {
      const jsonData = JSON.parse(usersData);

      for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].username === username) {
          jsonData[i].score = finalScore;
          localStorage.setItem("users", JSON.stringify(jsonData));
        }
      }
    }

    router.push("/login");
  };

  useEffect(() => {
    const userData = localStorage.getItem(username);
    if (userData) {
      const jsonData = JSON.parse(userData);

      setForwardLeft(jsonData.forward_left);
      setForwardRight(jsonData.forward_right);
      setCenter(jsonData.center);
      setGuardLeft(jsonData.guard_left);
      setGuardRight(jsonData.guard_right);
    }
  }, [username]);

  return (
    <div className="row">
      <div className="col-lg-2"></div>
      <div className="col-lg-8">
        <div className="row">
          <div className="col-lg-1">
            <PitchCard
              playersList={players_forward_left}
              player={forward_left}
              position="Forward Left"
              setPlayer={setForwardLeft}
            ></PitchCard>
          </div>

          <div className="col-lg-9"></div>

          <div className="col-lg-1">
            <PitchCard
              playersList={players_forward_right}
              player={forward_right}
              position="Forward Right"
              setPlayer={setForwardRight}
            ></PitchCard>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5"></div>

          <div className="col-lg-2">
            <PitchCard
              playersList={players_center}
              player={center}
              position="Center"
              setPlayer={setCenter}
            ></PitchCard>
          </div>
          <div className="col-lg-5"></div>
        </div>

        <div className="row">
          <div className="col-lg-2"></div>

          <div className="col-lg-1">
            <PitchCard
              playersList={players_guard_left}
              player={guard_left}
              position="Guard Left"
              setPlayer={setGuardLeft}
            ></PitchCard>
          </div>

          <div className="col-lg-5"></div>

          <div className="col-lg-1">
            <PitchCard
              playersList={players_guard_right}
              player={guard_right}
              position="Guard Right"
              setPlayer={setGuardRight}
            ></PitchCard>
          </div>

          <div className="col-lg-2"></div>
        </div>

        <div className="row" style={{ marginTop: "20px", marginLeft: "50px" }}>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => handleConfirmTeam()}
          >
            Confirm Team
          </button>
        </div>
      </div>
      <div className="col-lg-2"></div>
    </div>
  );
}

export default BasketPitch;
