import dotenv from "dotenv";
dotenv.config();

function required(key, defaultValue=undefined){
    const value = process.env[key] || defaultValue;     // 앞 값이 존재한다면 앞 값이, 아니라면  뒷 값이 들어가는 문법!
    if (value == null){
        throw new Error(`Key ${key} is undefined`);
    }
    return value;
}

export const config = {
    jwt: {
        secretKey: required("JWT_SECRET"),
        expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 172800))
    },
    bcrypt: {
        saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12))
    },
    host: {
        port: parseInt(required("HOST_PORT", 8080))
    }
}