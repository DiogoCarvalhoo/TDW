import { TwitterClient } from 'twitter-api-client';

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb'
    }
  }
}

const createPoll = async (req, res) => {
  const body = JSON.parse(req.body);
  const creatorUsername = body.creatorUsername;
  const title = body.title;
  const duration = body.duration;
  const answers = body.answers;

  let dueDate;
  switch (duration) {
    case "5 Minutos":
      dueDate = new Date(Date.now() + 300000);
      break;
    case "30 Minutos":
      dueDate = new Date(Date.now() + 1800000);
      break;
    case "1 Hora":
      dueDate = new Date(Date.now() + 3600000);
      break;
    case "3 Horas":
      dueDate = new Date(Date.now() + 10800000);
      break;
    case "1 Dia":
      dueDate = new Date(Date.now() + 86400000);
      break;
    case "3 Dias":
      dueDate = new Date(Date.now() + 259200000);
      break;
    case "5 Dias":
      dueDate = new Date(Date.now() + 432000000);
      break;
  }

  const finalDate = dueDate.toLocaleDateString("en-GB", dateOptions);
  const pollMesage = `${title} \n \nDue date: ${finalDate} \n@${creatorUsername}`;

  const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_CONSUMER_KEY,
    apiSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: '1611340554440265729-OzQxSVd0oHpyFRKJ6BBozDK5FumtHb',
    accessTokenSecret: 'RJeI4Wz4My9kgqBhf3Rk9Py45UEG732XpaHu7I8lB3Ive',
  });
  
  try {
    const poll_main_request = await twitterClient.tweetsV2.createTweet({text: pollMesage});
    for (const element of answers) {
      let answer_payload;
      if (element.bits !== '') {
        // Upload media
        const media_upload_init_res = await twitterClient.media.mediaUploadInit({
          command: "INIT",
          media_type: element.media_type,
          total_bytes: element.total_bytes
        })

        await twitterClient.media.mediaUploadAppend({
          command: "APPEND",
          media_id: media_upload_init_res.media_id_string,
          media_data: element.bits,
          segment_index: '0'
        })

        await twitterClient.media.mediaUploadFinalize({
          command: "FINALIZE",
          media_id: media_upload_init_res.media_id_string
        })

        // Create answer_payload
        answer_payload = {
          text: element.textValue,
          reply: { in_reply_to_tweet_id: poll_main_request.data.id },
          media: {media_ids: [media_upload_init_res.media_id_string]},
        };
      } else {
        // Create answer_payload
        answer_payload = {
          text: element.textValue,
          reply: { in_reply_to_tweet_id: poll_main_request.data.id },
        };
      }
      await twitterClient.tweetsV2.createTweet(answer_payload)
    }

    return res.status(200).json({
      status: "Ok",
      data: poll_main_request.data,
    });

  } catch(e) {
    console.log(e);
    return res.status(400).json({
      status: e.message
    });
  }
};

export default createPoll;
