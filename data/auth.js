// import { db } from "../db/database.js";

import Mongoose from "mongoose";
import { useVirtualId } from "../db/database.js";

const userSchema = new Mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, requried: true },
    password: { type: String, requried: true },
    url: String
})

useVirtualId(userSchema);
const User = Mongoose.model("User", userSchema);

export async function findByUsername(username){
    return User.findOne({ username })
}

export async function findById(id){
    return User.findById(id);       // MongoDB 메서드
}

export async function createUser(user){
    return new User(user).save().then((data) => data.id);       // virtual id 가 불러와짐
}


// export async function findByUsername(username) {
//     return db.execute("SELECT * FROM users WHERE username = ?", [username]).then((result) => result[0][0]);
// }

// export async function findById (id) {
//     return db.execute(`SELECT * FROM users WHERE id = ${id}`).then((result) => result[0][0])
// }

// export async function createUser(user){
//     const { username, password, name, email, url } = user;    
//     return db.execute("INSERT INTO users (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)", [username, password, name, email, url]).then((result) => result[0].insertId);
// }







// export async function signup(id, username, password, name, email, url){
//     const hashedPW = hashSync(password, 10);
//     const user = {
//         id,
//         username,
//         password: hashedPW,
//         name,
//         email,
//         url
//     };
//     users = [user, ...users];
//     console.log("complete");
//     return users;
// }


// export async function getUserByNameAndPW(username, password){
//     const userCandidates = users.filter((user) => user.username === username);
//     let findUser;
//     userCandidates.forEach(user => {
//         if(bcrypt.compareSync(password, user.password)){
//             findUser = user;
//         }
//     });
//     return findUser;
// }