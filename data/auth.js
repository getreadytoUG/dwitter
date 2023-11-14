import SQ from "sequelize";
import { sequelize } from "../db/database.js";

const DataTypes = SQ.DataTypes;

export const User = sequelize.define(           // ORM 에서는 테이블 이름에 자동적으로 s가 붙는다. -> users
    "user",                                     // 만약 기존테이블이 존재하면 만들어지지는 않는다.
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        url: DataTypes.TEXT
    },
    { timestamps: false }
)


export async function findByUsername(username) {
    return User.findOne({ where: {username}});
}

export async function findById (id) {
    return User.findByPk(id);
}

export async function createUser(user){
    return User.create(user).then((data) => data.dataValues.id);
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