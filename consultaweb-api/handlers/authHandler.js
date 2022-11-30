import userRepository from "../repositories/userRepository.js";
import especialistaRepository from "../repositories/especialistaRepository.js";
import auth from "../services/auth.js";


async function authLogin(req, res)  {
    let type = req.body.type
    let user = null;

    if (type === 'especialista') {
        user = await especialistaRepository.findByUsername(req.body.username)
    } else {
        user = await userRepository.findByUsername(req.body.username);
    }
   
    if (user) {
        if (!auth.passwordIsValid(user.password, req.body.password)) {
            return res.status(400).json({'ok': false, message: 'usuário ou senha inválidos'})
        }

        return res.json({token: auth.generateAccessToken(user.username), type: type, isAdmin: false, id: user.id, name: user.name})
        
    }
    return res.status(400).json({'ok': false, message: 'usuário ou senha inválidos'})
}



export default {authLogin}