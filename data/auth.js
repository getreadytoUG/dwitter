import { db } from "../db/database.js";

export async function findByUsername(username) {
    return db.execute("SELECT * FROM users WHERE username = ?", [username]).then((result) => result[0][0]);
}

export async function findById (id) {
    return db.execute(`SELECT * FROM users WHERE id = ${id}`).then((result) => result[0][0])
}

export async function createUser(user){
    const { username, password, name, email, url } = user;    
    return db.execute("INSERT INTO users (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)", [username, password, name, email, url]).then((result) => result[0].insertId);
}







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