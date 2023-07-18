import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import {
  pollMasterId,
  pollMasterProfileImageUrl,
} from "../../redux/slices/pollMasterInfoSlice";
import {
  currentUserId,
  currentUserProfileImageUrl,
} from "../../redux/slices/currentUserInfoSlice";
import { useSelector } from "react-redux";
import { response } from "express";
import ErrorModal from "../utils/error_modal";

const HeaderDiv = styled.div`
  height: 200px;
  width: 100%;
  position: relative;

  > img {
    border-top-left-radius: var(--bs-border-radius);
    border-top-right-radius: var(--bs-border-radius);
  }
`;

const Avatar = styled.img.attrs((props: { image: string }) => props)`
  width: max(45px, min(135px, 22vw));
  height: max(45px, min(135px, 22vw));

  border: 3.75px solid grey;
  background-image: url(${(props) => props.image});
  background-size: contain;
  border-radius: 50% !important;

  position: absolute;
  bottom: max(-60px, -10vw);
  left: 15px;
`;

const FollowDiv = styled.div`
  position: absolute;
  bottom: max(-60px, -10vw);
  right: max(-60px, 6vw);
`;

const FollowBtn = styled.a`
  background-color: #243447;
  color: white;

  padding: 10px;
  border-radius: 9999px;
  text-decoration: none;

  &:hover {
    background-color: #141d26;
    transition: 0.7s;

    color: rgba(90, 227, 255, 1);

    box-shadow: 0px 0px 26px 8px rgba(90, 227, 255, 1);
  }

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
`;

interface IUserProfileHeaderProps {
  username: string;
  show_follow_button: boolean;
}

export default function UserProfileHeader({
  username,
  show_follow_button,
}: IUserProfileHeaderProps) {
  const currentuserProfileImageUrl = useSelector(currentUserProfileImageUrl);
  const pollmasterProfileImageUrl = useSelector(pollMasterProfileImageUrl);
  const currentuserId = useSelector(currentUserId);
  const pollmasterId = useSelector(pollMasterId);

  const [currentUserFollowsPollMaster, setCurrentUserFollowsPollMaster] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  var profileImageUrlToDisplay: string = "";
  if (username == "PollMaster0") {
    profileImageUrlToDisplay = pollmasterProfileImageUrl;
  } else {
    profileImageUrlToDisplay = currentuserProfileImageUrl;
  }

  const followPollMaster = async () => {
    const payload = {
      following_id: currentuserId,
      followed_id: pollmasterId,
    };

    const follow_request = await fetch("/api/twitter/create_follow", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (follow_request.status === 200) {
      setCurrentUserFollowsPollMaster(true);
    } else {
      // Show error message
      setErrorMessage(
        "Ocorreu um erro ao seguir a conta PollMaster. Por favor tente novamente."
      );
    }
  };

  const unfollowPollMaster = async () => {
    const unfollow_request = await fetch(
      "/api/twitter/delete_follow?source_user_id=" +
        currentuserId +
        "&target_user_id=" +
        pollmasterId,
      {
        method: "DELETE",
      }
    );

    if (unfollow_request.status === 200) {
      setCurrentUserFollowsPollMaster(false);
    } else {
      // Show error message
      setErrorMessage(
        "Ocorreu um erro ao deixar de seguir a conta PollMaster. Por favor tente novamente."
      );
    }
  };

  const checkIfUserFollowsPollMaster = async () => {
    if (currentuserId != "") {
      const userFollows_request = await fetch(
        "/api/twitter/user_follows?id=" + currentuserId,
        {
          method: "GET",
        }
      );

      if (userFollows_request.status === 200) {
        const userFollows = await userFollows_request.json();
        for (const element of userFollows.data) {
          if (element.id == pollmasterId) {
            setCurrentUserFollowsPollMaster(true);
          }
        }
      } else {
        // Show error message
        setErrorMessage(
          "Ocorreu um erro ao tentar saber se segue a conta PollMaster. Por favor tente novamente."
        );
      }
    }
  };

  useEffect(() => {
    checkIfUserFollowsPollMaster();
  }, [currentuserId]);

  return (
    <>
      <HeaderDiv>
        <Image
          id="account-background-image"
          src="/img/accountcapa.png"
          alt="PollMaster Account Background Image"
          fill
        />

        <Avatar image={profileImageUrlToDisplay} />

        <FollowDiv>
          {show_follow_button && currentuserId != "" ? (
            currentUserFollowsPollMaster ? (
              <FollowBtn onClick={() => unfollowPollMaster()}>
                Unfollow
              </FollowBtn>
            ) : (
              <FollowBtn onClick={() => followPollMaster()}>Follow</FollowBtn>
            )
          ) : null}
        </FollowDiv>
      </HeaderDiv>
      <ErrorModal
        message={errorMessage}
        onHide={() => setErrorMessage("")}
        show={errorMessage !== ""}
      />
    </>
  );
}
