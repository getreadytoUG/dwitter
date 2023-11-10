import express from "express";
import morgan from "morgan";
import tweetRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
// import dotenv from "dotenv";
import { config } from "./config.js";
// dotenv.config();
import cors from "cors";
import { initSocket } from "./connection/socket.js";

console.log(process.env.JWT_SECRET);
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());            // 미들웨어로 등록


// 라우터
app.use("/tweets", tweetRouter);

app.use("/auth", authRouter);


app.use((req, res, next) => {
    res.sendStatus(404);
});

const server = app.listen(config.host.port);

initSocket(server);

