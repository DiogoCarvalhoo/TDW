import { getToken } from "next-auth/jwt";

const unlikeTweet = async (req, res) => {
  const body = JSON.parse(req.body);
  const id = body.tweet_id;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const url = "https://api.twitter.com/2/users/" + token.account_id + "/likes/" + id;

  try {
    const results = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token,
      },
    });

    if (results.status !== 200) {
      return res.status(results.status);
    }
    return res.status(200).json({
      status: "Ok"
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: e.message,
    });
  }
};

export default unlikeTweet;
