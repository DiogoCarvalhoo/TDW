import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	pollMasterName,
	pollMasterUsername,
	pollMasterDescription,
	pollMasterPublicMetrics,
} from "../../redux/slices/pollMasterInfoSlice";
import {
	currentUserName,
	currentUserUsername,
	currentUserDescription,
	currentUserPublicMetrics,
} from "../../redux/slices/currentUserInfoSlice";
import { useSelector } from "react-redux";
import { getUser, addPollCreation } from "../../utils/users";

const ProfileInfoDiv = styled.div`
	padding: min(calc(10vw + 7px), 67px) 16px 0;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;

	> div {
		> h1 {
			font-weight: bold;
			font-size: 25px;
		}
		> h2 {
			font-weight: normal;
			font-size: 15px;
			color: grey;
		}
		> p {
			font-size: 15px;
			margin-top: 11px;
			> a {
				text-decoration: none;
				color: grey;
			}
		}
	}

	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

const ProfileStatsDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-content: center;
	justify-content: center;
	align-items: center;
	gap: 50px;
	flex-wrap: wrap;

	margin: auto;
`;

const ProfileHistoryStatsDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-content: center;
	justify-content: center;
	align-items: center;
	gap: 50px;
	flex-wrap: wrap;

	margin: auto;
  padding-bottom: 20px;

	> div {
		display: flex;
		flex-direction: column;
		text-align: center;

    > p {
      font-size: 40px;
      margin-bottom: 0px;
    }
	}
`;

const ProfileStatsSpan = styled.span`
	color: grey;
`;

interface IUserProfileInfoProps {
	username: string;
}

export default function UserProfileInfo({ username }: IUserProfileInfoProps) {
	const currentuserName = useSelector(currentUserName);
	const pollmasterName = useSelector(pollMasterName);
	const currentuserUsername = useSelector(currentUserUsername);
	const pollmasterUsername = useSelector(pollMasterUsername);
	const currentuserDescription = useSelector(currentUserDescription);
	const pollmasterDescription = useSelector(pollMasterDescription);
	const currentuserPublicMetrics = useSelector(currentUserPublicMetrics);
	const pollmasterPublicMetrics = useSelector(pollMasterPublicMetrics);
	const [userPersistentData, setUserPersistentData] = useState<any>(null);

	var nameToDisplay: string = "";
	var usernameToDisplay: string = "";
	var descriptionToDisplay: string = "";
	var publicMetricsToDisplay: { [key: string]: number } = {};

	if (username == "PollMaster0") {
		nameToDisplay = pollmasterName;
		usernameToDisplay = pollmasterUsername;
		descriptionToDisplay = pollmasterDescription;
		publicMetricsToDisplay = pollmasterPublicMetrics;
	} else {
		nameToDisplay = currentuserName;
		usernameToDisplay = currentuserUsername;
		descriptionToDisplay = currentuserDescription;
		publicMetricsToDisplay = currentuserPublicMetrics;
	}

	useEffect(() => {
		const getPersistentData = async () => {
			if (username != "PollMaster0" && currentuserUsername != "") {
				let userData = await getUser(currentuserUsername);
				setUserPersistentData(userData);
			}
		};
		getPersistentData();
	}, [currentuserUsername]);

	return (
		<>
			<ProfileInfoDiv className="bg-white">
				<div>
					<h1>{nameToDisplay}</h1>
					<h2>@{usernameToDisplay}</h2>
				</div>

				<ProfileStatsDiv className="bg-white">
					<p>
						{publicMetricsToDisplay.tweet_count}
						<ProfileStatsSpan> Tweets</ProfileStatsSpan>
					</p>
					<p>
						{publicMetricsToDisplay.following_count}
						<ProfileStatsSpan> Following</ProfileStatsSpan>
					</p>
					<p>
						{" "}
						{publicMetricsToDisplay.followers_count}
						<ProfileStatsSpan> Followers</ProfileStatsSpan>
					</p>
				</ProfileStatsDiv>

				<p className="col-md-12">{descriptionToDisplay}</p>

				{userPersistentData != null && (
					<ProfileHistoryStatsDiv className="bg-white">
						<div>
							<p>{userPersistentData.pollsCriadas} </p>
							<ProfileStatsSpan>Polls Criadas</ProfileStatsSpan>
						</div>
						<div>
							<p>{userPersistentData.pollsLiked} </p>
							<ProfileStatsSpan>
								Respostas Dadas
							</ProfileStatsSpan>
						</div>
					</ProfileHistoryStatsDiv>
				)}
			</ProfileInfoDiv>
		</>
	);
}
