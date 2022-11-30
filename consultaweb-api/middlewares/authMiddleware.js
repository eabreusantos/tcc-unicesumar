import jwt from "jsonwebtoken";
import dotenv from 'dotenv/config.js'

function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

        if(err) return res.sendStatus(403)

        req.user = user

        next()
    });

}

export default {authenticateJWT}