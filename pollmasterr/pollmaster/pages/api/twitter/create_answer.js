import { TwitterClient } from 'twitter-api-client';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb'
    }
  }
}

const createAnswer = async (req, res) => {
  const body = JSON.parse(req.body);
  const text = body.text;
  const media_bits = body.media_bits;
  const total_bytes = body.total_bytes;
  const media_type = body.media_type;
  const conversation_id = body.conversation_id;

  const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_CONSUMER_KEY,
    apiSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: '1611340554440265729-OzQxSVd0oHpyFRKJ6BBozDK5FumtHb',
    accessTokenSecret: 'RJeI4Wz4My9kgqBhf3Rk9Py45UEG732XpaHu7I8lB3Ive',
  });
  
  try {
      let answer_payload;
      if (media_bits !== '') {
        // Upload media
        const media_upload_init_res = await twitterClient.media.mediaUploadInit({
          command: "INIT",
          media_type: media_type,
          total_bytes: total_bytes
        })

        await twitterClient.media.mediaUploadAppend({
          command: "APPEND",
          media_id: media_upload_init_res.media_id_string,
          media_data: media_bits,
          segment_index: '0'
        })

        await twitterClient.media.mediaUploadFinalize({
          command: "FINALIZE",
          media_id: media_upload_init_res.media_id_string
        })

        // Create answer_payload
        answer_payload = {
          text: text,
          reply: { in_reply_to_tweet_id: conversation_id },
          media: {media_ids: [media_upload_init_res.media_id_string]},
        };
      } else {
        // Create answer_payload
        answer_payload = {
          text: text,
          reply: { in_reply_to_tweet_id: conversation_id },
        };
      }
      await twitterClient.tweetsV2.createTweet(answer_payload)
      
    return res.status(200).json({
      status: "Ok",
    });

  } catch(e) {
    console.log(e);
    return res.status(400).json({
      status: e.message
    });
  }
};

export default createAnswer;
