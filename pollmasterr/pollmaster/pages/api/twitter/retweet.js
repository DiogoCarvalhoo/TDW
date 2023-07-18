import { getToken } from "next-auth/jwt";

const retweetTweet = async (req, res) => {
  const body = JSON.parse(req.body);
  const id = body.tweet_id;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const url = "https://api.twitter.com/2/users/" + token.account_id + "/retweets";

  const payload = { tweet_id: id };

  try {
    const results = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token,
      },
      body: JSON.stringify(payload),
    });
    
    if (results.status !== 200) {
      return res.status(results.status);
    }
    return res.status(200).json({
      status: "Ok"
    });
  } catch (e) {
    return res.status(400).json({
      status: e.message,
    });
  }
};

export default retweetTweet;
