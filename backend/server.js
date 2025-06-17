const express = require("express");
const app = express();
require("dotenv").config();
const geminiRoutes = require("./routes/geminiRoutes");
const mockInterviewRoutes = require("./routes/mockInterviewSaveRoutes")
const getInterviewRoute = require("./routes/getInterviewRoute")
const saveUserAnswerRoute = require("./routes/userAnswerRoute")
const getFeedbackRoute = require("./routes/getFeedbackRoute")
const getInterviewHistoryRoute = require("./routes/getInterviewHistoryRoute")
const uploadRoute = require('./routes/uploadInterviewRoute');
const savemocVideoIndb = require('./routes/savemockVideoinDbRoutes');
const getmockvideoforhistoryroute = require('./routes/getMockVideoForHistory');
const videoRoute = require("./routes/videoAnalysisRoute");
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require("./routes/userRoutes");
const decreaseinterviewcount = require('./routes/decreaseInterviewCountRoute');
const getinterviewcount = require("./routes/getInterviewCountRoute")
const cors = require("cors");
const path = require('path');
require("dotenv").config();
const { dbConnect } = require("./config/db");

app.use(cors({origin: 'https://prepedge.netlify.app'}));

const port = process.env.PORT || 3000;
app.use(express.json());
// connect Db
 dbConnect();


 
// Route middleware
app.use("/api", geminiRoutes);

app.use('/api', mockInterviewRoutes);

app.use("/api",getInterviewRoute)

app.use("/api",saveUserAnswerRoute)

app.use("/api",getFeedbackRoute)

app.use("/api",getInterviewHistoryRoute)

app.use('/api', uploadRoute);

app.use('/api', savemocVideoIndb);

app.use('/api', getmockvideoforhistoryroute);

app.use("/api", videoRoute);

app.use('/api', paymentRoutes);

app.use("/api", userRoutes);

app.use("/api", decreaseinterviewcount);

app.use("/api", getinterviewcount);
  
// serve frontend to backend;
//app.use(express.static(path.join(__dirname, 'dist')));


// const FRONTEND_ROUTES = /^\/(?!api).*/;

// app.get(FRONTEND_ROUTES, (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.listen(port,()=>{
    console.log("App is running on port 3000");
});
