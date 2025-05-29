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
const cors = require("cors");
const { dbConnect } = require("./config/db");

app.use(cors({ origin: "http://localhost:5173" }));


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

app.listen(3000,()=>{
    console.log("App is running on port 3000");
});
