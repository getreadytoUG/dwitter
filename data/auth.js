import MongoDB from "mongodb";
import { getUsers } from "../db/database.js";
const ObjectID = MongoDB.ObjectId;


export async function findByUsername(username) {
    return getUsers().find({ username }).next().then(mapOptionalUser);
}

export async function findById (id) {
    return getUsers().find({ _id: new ObjectID(id) })
        .next()
        .then(mapOptionalUser) ;
}

export async function createUser(user){
    return getUsers().insertOne(user).then((result) => result.insertedId.toString());
}

function mapOptionalUser(user) {
    return user ? { ...user, id: user._id.toString() } : user;
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