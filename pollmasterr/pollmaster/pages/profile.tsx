import Head from "next/head";
import UserProfile from "../components/user_profile/user_profile";
import { currentUserUsername } from "../redux/slices/currentUserInfoSlice";
import { useSelector } from "react-redux";

export default function Profile() {
  const currentuserUsername = useSelector(currentUserUsername);

  return (
    <>
      <Head>
        <title>PollMaster - Perfil</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="container px-4 col-sm-12 col-md-12 col-lg-8 col-xl-7"
        style={{ maxWidth: 800 }}
      >
        <UserProfile
          username={currentuserUsername}
          show_follow_button={false}
        ></UserProfile>
      </div>
    </>
  );
}
