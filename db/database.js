// import mysql from "mysql2";
// import { config } from "../config.js";

// const pool = mysql.createPool({
//     host: config.db.host,
//     user: config.db.user,
//     database : config.db.database,
//     password: config.db.password
// });

// export const db = pool.promise();

import MongoDb from "mongodb";
import { config } from "../config.js";

let db;

export async function connectDB(){
    return MongoDb.MongoClient.connect(config.db.host).then((client) => (db = client.db())); //몽고db 클라우드 연결;
}

export function getUsers() {
    return db.collection("users");
}

export function getTweets() {
    return db.collection("tweets");
}

