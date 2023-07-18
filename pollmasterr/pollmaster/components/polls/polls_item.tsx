import React, { useCallback, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { PollsItemType } from "../../pages/polls";
import { useSelector } from "react-redux";
import { pollMasterProfileImageUrl } from "../../redux/slices/pollMasterInfoSlice";
import { currentUserUsername } from "../../redux/slices/currentUserInfoSlice";
import { signIn, useSession } from "next-auth/react";
import ErrorModal from "../utils/error_modal";
import { useRouter } from "next/router";
import Link from "next/link";
import { addPollLike, removePollLike } from "../../utils/users";

const PollDiv = styled.div`
  position: relative;
`;

const TweetTextDiv = styled.div`
white-space: pre-wrap;

display: flex;
flex-wrap: wrap;
align-items: center;

> p {
  flex: 4;
}

> a {
  border: none;
  font-size: 18px;
  color: var(--main-text-color);
  text-decoration: none;
  font-weight: bold;

  &.active {
    background-color: transparent;
    color: var(--main-text-color);
  }

  &:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }
}
`;

interface PollsItemProps {
  pollInfo: PollsItemType;
  liked: boolean;
  retweeted: boolean;
  show_link: boolean;
  media_type: string;
  media_url: string;
}

const OutlineHeart = styled(AiOutlineHeart)`
  cursor: pointer;
`;
const FillHeart = styled(AiFillHeart)`
  cursor: pointer;
`;
const Retweet = styled(FaRetweet)`
  cursor: pointer;
`;

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const ImageResponsiveDiv = styled.div`
  width: 100%;
  height: 250px; 
  position: relative;
`;

export default function PollsItem({
  pollInfo,
  liked,
  retweeted,
  show_link,
  media_type,
  media_url
}: PollsItemProps) {
  const router = useRouter();
  const pollCreationDate = new Date(pollInfo.created_at);
  const pollmasterProfileImageUrl = useSelector(pollMasterProfileImageUrl);
  const currentuserUsername = useSelector(currentUserUsername);
  const [likeState, setLikeState] = useState<boolean>(liked);
  const [likeCounter, setLikeCounter] = useState<number>(
    pollInfo.public_metrics.like_count
  );
  const [retweetState, setRetweetState] = useState<boolean>(retweeted);
  const [retweetCounter, setRetweetCounter] = useState<number>(
    pollInfo.public_metrics.retweet_count
  );

  const [errorMessage, setErrorMessage] = useState("");
  
  const retweet = async () => {
    const payload = {
      tweet_id: pollInfo.id,
    };
    const like_request = await fetch("/api/twitter/retweet", {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    if (like_request.status === "Ok") {
      setRetweetState(true);
      setRetweetCounter(retweetCounter + 1);
    } else {
      // Show error message
      setErrorMessage(
        "Ocorreu um erro a realizar o retweet. Por favor tente novamente."
      );
    }
  };

  const undo_retweet = async () => {
    const payload = {
      tweet_id: pollInfo.id,
    };
    const unlike_request = await fetch("/api/twitter/undo_retweet", {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((res) => res.json());
    if (unlike_request.status === "Ok") {
      setRetweetState(false);
      setRetweetCounter(retweetCounter - 1);
    } else {
      // Show error message
      setErrorMessage(
        "Ocorreu um erro a retirar o retweet. Por favor tente novamente."
      );
    }
  };

  const likeTweet = async () => {
    const payload = {
      tweet_id: pollInfo.id,
    };
    const like_request = await fetch("/api/twitter/like_tweet", {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((res) => res.json());
    if (like_request.status === "Ok") {
      setLikeState(true);
      setLikeCounter(likeCounter + 1);

      if (pollInfo.in_reply_to_user_id) {
        addPollLike(currentuserUsername);
      }
    } else {
      // Show error message
      setErrorMessage(
        "Ocorreu um erro a realizar o like. Por favor tente novamente."
      );
    }
  };

  const unlikeTweet = async () => {
    const payload = {
      tweet_id: pollInfo.id,
    };
    const unlike_request = await fetch("/api/twitter/unlike_tweet", {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((res) => res.json());
    if (unlike_request.status === "Ok") {
      setLikeState(false);
      setLikeCounter(likeCounter - 1);

      if (pollInfo.in_reply_to_user_id) {
        removePollLike(currentuserUsername);
      }
    } else {
      // Show error message
      setErrorMessage(
        "Ocorreu um erro a retirar o like. Por favor tente novamente."
      );
    }
  };

  const login = useCallback(() => signIn(), []);


  return (
    <>
      <PollDiv
        className="p-3 bg-white shadow-sm rounded"
        style={{ border: "1px solid lightgrey" }}
      >
        <div className="row">
          <div
            className="col-sm-4 col-md-3 col-lg-2 col-xl-1"
            style={{ marginRight: "20px" }}
          >
            <Image
              width={50}
              height={50}
              id="account-logo-image"
              src={pollmasterProfileImageUrl}
              alt="PollMaster Account Logo Image"
              style={{
                objectFit: "cover",
                borderRadius: "50%",
              }}
              unoptimized={true}
            />
          </div>

          <div className="col-sm-7 col-md-8 col-lg-9 col-xl-10">
            <div>
              <span style={{ fontWeight: "bold" }}>PollMaster</span>
              <span style={{ color: "grey" }}>@PollMaster0</span>
              {" - "}
              <span style={{ color: "grey" }}>
                {pollCreationDate.getDate()} de{" "}
                {months[pollCreationDate.getMonth()]} de{" "}
                {pollCreationDate.getFullYear()}
              </span>
            </div>

            <TweetTextDiv>
              <p className="fs-6">{pollInfo.text} </p>
              {show_link && (
                <Link
                  href={"#"}
                  onClick={() => router.push("/poll/" + pollInfo.id)}
                >
                  Ver Poll
                </Link>
              )}
              
            </TweetTextDiv>

            {media_type === "video" && (
              <video width={"100%"} height={"auto"} controls>
                <source src={media_url} type={"video/mp4"} />
              </video>
            )}
            {media_type === "photo" && (
              <ImageResponsiveDiv>
                <Image
                  fill
                  src={media_url}
                  alt="response photo"
                  style={{ objectFit: "contain" }}
                />
              </ImageResponsiveDiv>
            )}

            <div style={{ color: "grey" }}>
              <div
                style={{
                  display: "inline-block",
                  marginRight: "10%",
                }}
              >
                <RiQuestionAnswerLine
                  size={20}
                  style={{ marginRight: "10px" }}
                />
                {pollInfo.public_metrics.reply_count}
              </div>

              <div
                style={{
                  display: "inline-block",
                  marginRight: "10%",
                }}
              >
                {currentuserUsername !== "" && (
                  <>
                    {retweetState && (
                      <Retweet
                        color={"green"}
                        onClick={undo_retweet}
                        size={20}
                        style={{ marginRight: "10px" }}
                      />
                    )}
                    {!retweetState && (
                      <Retweet
                        size={20}
                        onClick={retweet}
                        style={{ marginRight: "10px" }}
                      />
                    )}
                  </>
                )}
                {currentuserUsername === "" && (
                  <Retweet
                    size={20}
                    onClick={login}
                    style={{ marginRight: "10px" }}
                  />
                )}
                {retweetCounter}
              </div>

              <div
                style={{
                  display: "inline-block",
                  marginRight: "10%",
                }}
              >
                {currentuserUsername !== "" && (
                  <>
                    {likeState && (
                      <FillHeart
                        color={"red"}
                        onClick={unlikeTweet}
                        size={20}
                        style={{ marginRight: "10px" }}
                      />
                    )}
                    {!likeState && (
                      <OutlineHeart
                        onClick={likeTweet}
                        size={20}
                        style={{ marginRight: "10px" }}
                      />
                    )}
                  </>
                )}

                {currentuserUsername === "" && (
                  <OutlineHeart
                    onClick={login}
                    size={20}
                    style={{ marginRight: "10px" }}
                  />
                )}
                {likeCounter}
              </div>
            </div>
          </div>
        </div>
      </PollDiv>
      <ErrorModal
        message={errorMessage}
        show={errorMessage !== ""}
        onHide={() => setErrorMessage("")}
      />
    </>
  );
}
