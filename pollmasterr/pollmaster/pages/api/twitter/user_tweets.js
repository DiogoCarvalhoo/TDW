import { getToken } from "next-auth/jwt";

const getUserTweets = async (req, res) => {
  const userId = req.query.id;
  var token;

  if (userId == "1611340554440265729") {
    // PollMaster Account
    token =
      "Bearer AAAAAAAAAAAAAAAAAAAAAC44lAEAAAAASyImn8TyZNNTx8yk8lMxSYyv6J8%3D51pNo3D8QCOpHLTZF8sm9NSfJD2RQgcYt1FXHpeg3tKQpGRZkL";
  } else {
    tokenInfo = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    token = "Bearer " + tokenInfo.access_token;
  }

  const url =
    "https://api.twitter.com/2/users/" +
    userId +
    "/tweets?tweet.fields=id,text,edit_history_tweet_ids,in_reply_to_user_id,created_at,public_metrics,organic_metrics,promoted_metrics";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
    if (response.status !== 200) {
      return res.status(response.status);
    }
    const results = await response.json();

    return res.status(200).json({
      status: "Ok",
      data: results.data,
    });
  } catch (e) {
    return res.status(400).json({
      status: e.message,
    });
  }
};

export default getUserTweets;
