import bcrypt, { hashSync } from "bcrypt";

let users = [
    {
        id: "1",
        username: "apple",
        password: "$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy",   //abcd1234
        name: "김사과",
        email: "apple@apple.com",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU"
    }
]

export async function signup(id, username, password, name, email, url){
    const hashedPW = hashSync(password, 10);
    const user = {
        id,
        username,
        password: hashedPW,
        name,
        email,
        url
    };
    users = [user, ...users];
    console.log("complete");
    return users;
}


export async function getUserByNameAndPW(username, password){
    const userCandidates = users.filter((user) => user.username === username);
    let findUser;
    userCandidates.forEach(user => {
        if(bcrypt.compareSync(password, user.password)){
            findUser = user;
        }
    });
    return findUser;
}