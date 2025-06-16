require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.VIDEO_INDEXER_SUBSCRIPTION_KEY;
const LOCATION = process.env.VIDEO_INDEXER_LOCATION;

async function getAccountDetails() {
  const accountsRes = await axios.get(
    `https://api.videoindexer.ai/Auth/${LOCATION}/Accounts`,
    {
      headers: {
        "Ocp-Apim-Subscription-Key": API_KEY,
      },
    }
  );

  const accountId = accountsRes.data[0].id;

  const tokenRes = await axios.get(
    `https://api.videoindexer.ai/Auth/${LOCATION}/Accounts/${accountId}/AccessToken`,
    {
      headers: {
        "Ocp-Apim-Subscription-Key": API_KEY,
      },
      params: { allowEdit: true },
    }
  );

  return { accountId, accessToken: tokenRes.data };
}

async function uploadVideo(videoUrl) {
  const { accountId, accessToken } = await getAccountDetails();

  const uploadRes = await axios.post(
    `https://api.videoindexer.ai/${LOCATION}/Accounts/${accountId}/Videos`,
    null,
    {
      params: {
        accessToken,
        name: "MockInterview_" + Date.now(),
        videoUrl,
        language: "English",
      },
    }
  );

  const videoId = uploadRes.data.id;
  return { accountId, accessToken, videoId };
}

async function fetchAnalysis(accountId, accessToken, videoId) {
  const analysisRes = await axios.get(
    `https://api.videoindexer.ai/${LOCATION}/Accounts/${accountId}/Videos/${videoId}/Index`,
    {
      params: { accessToken },
    }
  );

  return analysisRes.data;
}

exports.analyzeVideo = async (req, res) => {
  const { videoUrl } = req.body;
  if (!videoUrl) return res.status(400).json({ error: "videoUrl is required" });

  try {
    const { accountId, accessToken, videoId } = await uploadVideo(videoUrl);

    console.log("⏳ Waiting 2 minutes for Azure to finish processing...");
    await new Promise((resolve) => setTimeout(resolve, 120000));
    const analysis = await fetchAnalysis(accountId, accessToken, videoId);
    res.status(200).json({messahe:"video anaylze succesfully",analysis});
  } catch (err) {
    console.error("❌ Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to analyze video" });
  }
};
