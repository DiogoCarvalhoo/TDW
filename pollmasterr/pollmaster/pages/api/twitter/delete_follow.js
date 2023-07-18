import { getToken } from "next-auth/jwt";

const deleteFollow = async (req, res) => {
  const source_user_id = req.query.source_user_id;
  const target_user_id = req.query.target_user_id;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const url =
    "https://api.twitter.com/2/users/" +
    source_user_id +
    "/following/" +
    target_user_id;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token,
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

export default deleteFollow;
