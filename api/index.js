const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const cors = require("cors");

dotenv.config();
const corsOptions = {
    origin: 'http://localhost:3300',
    optionsSuccessStatus: 200
}

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("DB connection success")).catch((err) =>console.log(err));

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

app.listen(process.env.PORT || 8080, ()=>{
    console.log("Backand server is running");
});