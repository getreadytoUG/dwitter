import * as userRepository from "../data/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// signup
export async function signup(req, res){
    const {id, username, password, name, email, url} = req.body;
    const user = await userRepository.signup(id, username, password, name, email, url);
    res.status(201).json(user);
}

// login
export async function login(req, res){
    const {username, password} = req.body;
    const user = await userRepository.getUserByNameAndPW(username, password);
    console.log(user)
    const expiresIn = 1200;
    const token = jwt.sign(
        {
            username,
            isAdmin: false
        },
        password,
        {expiresIn}
    );
    if(user){
        user.expiresIn = expiresIn;
        res.status(200).json(user);
    }
    else{
        res.status(404).json({message: `wrong password or wrong id`});
    }   
}