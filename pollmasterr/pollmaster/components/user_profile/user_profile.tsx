import React from "react";
import UserProfileHeader from "./user_profile_header";
import UserProfileInfo from "./user_profile_info";

interface IUserProfileProps {
  username: string;
  show_follow_button: boolean;
}

export default function UserProfile({
  username,
  show_follow_button,
}: IUserProfileProps) {
  return (
    <>
      <UserProfileHeader
        username={username}
        show_follow_button={show_follow_button}
      />

      <UserProfileInfo username={username} />
    </>
  );
}
