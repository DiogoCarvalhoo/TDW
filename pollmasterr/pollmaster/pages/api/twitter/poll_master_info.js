const getPollMasterInfo = async (req, res) => {
  // Used to get PollMaster Account Info
  const userId = "1611340554440265729";
  const token =
    "Bearer AAAAAAAAAAAAAAAAAAAAAC44lAEAAAAASyImn8TyZNNTx8yk8lMxSYyv6J8%3D51pNo3D8QCOpHLTZF8sm9NSfJD2RQgcYt1FXHpeg3tKQpGRZkL";

  const url =
    "https://api.twitter.com/2/users/" +
    userId +
    "?user.fields=id,name,username,description,profile_image_url,public_metrics";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
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

export default getPollMasterInfo;
