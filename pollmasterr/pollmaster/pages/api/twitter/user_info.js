import { getToken } from "next-auth/jwt";

const getUserInfo = async (req, res) => {
  // Used to get Current User Account Info
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const url =
    "https://api.twitter.com/2/users/me?user.fields=id,name,username,description,profile_image_url,public_metrics";

  try {
    const response = await fetch(url, {
      method: "GET",
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

export default getUserInfo;
