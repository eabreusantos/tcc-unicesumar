import UserRepository from '../models/userModel.js'
import  auth from '../services/auth.js';

async function findAll() {
   const users = await UserRepository.findAll();
   return users
} 

async function findByUsername(username) {
    return await UserRepository.findOne({where:{username: username}})
}

async function create(user) {
    user.password = auth.cryptPassword(user.password)
    const result = await UserRepository.create(user)
    return result;
}


export default {findAll, create, findByUsername}