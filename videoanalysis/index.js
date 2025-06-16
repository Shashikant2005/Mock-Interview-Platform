require("dotenv").config();
const axios = require("axios");
const API_KEY = process.env.VIDEO_INDEXER_SUBSCRIPTION_KEY;
const LOCATION = process.env.VIDEO_INDEXER_LOCATION;

// Step 1: Get account ID and access token
async function getAccountDetails() {
  try {
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
  } catch (error) {
    console.error("❌ Error in getAccountDetails:", error.response?.data || error.message);
    throw error;
  }
}

// Step 2: Upload video using Cloudinary URL
async function uploadVideo(videoUrl) {
  try {
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
    console.log("✅ Video uploaded successfully. ID:", videoId);
    return { accountId, accessToken, videoId };
  } catch (error) {
    console.error("❌ Error in uploadVideo:", error.response?.data || error.message);
    throw error;
  }
}

// Step 3: Fetch video analysis
async function fetchAnalysis(accountId, accessToken, videoId) {
  try {
    const analysisRes = await axios.get(
      `https://api.videoindexer.ai/${LOCATION}/Accounts/${accountId}/Videos/${videoId}/Index`,
      {
        params: { accessToken },
      }
    );

    console.log("✅ Analysis fetched. Here's a preview:");
    console.dir(analysisRes.data, { depth: 3 });
  } catch (error) {
    console.error("❌ Error in fetchAnalysis:", error.response?.data || error.message);
  }
}

(async () => {
  const videoUrl = "https://res.cloudinary.com/dg30nx8hr/video/upload/v1748690132/uficjmuhxnl7kthnbhde.mp4";

  try {
    const { accountId, accessToken, videoId } = await uploadVideo(videoUrl);

    console.log("⏳ Waiting 2 minutes for Azure to finish processing...");
    setTimeout(async () => {
      await fetchAnalysis(accountId, accessToken, videoId);
    }, 120000);
  } catch (err) {
    console.error("❌ Script failed:", err.message);
  }
})();