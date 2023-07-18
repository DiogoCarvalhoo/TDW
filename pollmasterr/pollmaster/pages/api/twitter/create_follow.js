import { getToken } from "next-auth/jwt";

const createFollow = async (req, res) => {
  const body = JSON.parse(req.body);
  const followingId = body.following_id;
  const followedId = body.followed_id;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const url = "https://api.twitter.com/2/users/" + followingId + "/following";

  const payload = { target_user_id: followedId };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token,
      },
      body: JSON.stringify(payload),
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

export default createFollow;
