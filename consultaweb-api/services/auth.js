import jwt from "jsonwebtoken";
import dotenv from 'dotenv/config.js'
import crypto from 'crypto'

function generateAccessToken(username) {
    return jwt.sign({username}, process.env.TOKEN_SECRET, { expiresIn: '1h' })
}

function cryptPassword(password) {
    return crypto.pbkdf2Sync(password, process.env.TOKEN_SECRET, 1000, 64, 'sha512').toString('hex')
}

function passwordIsValid(storedPassword, clientPassword) {
    return cryptPassword(clientPassword) === storedPassword
}


export default {generateAccessToken, cryptPassword, passwordIsValid}