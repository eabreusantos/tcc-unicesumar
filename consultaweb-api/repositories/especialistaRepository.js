import EspecialistaModel from '../models/especialistaModel.js'
import  auth from '../services/auth.js';

async function findAll() {
   const rows = await EspecialistaModel.findAll();
   return rows
}

async function findAllByEspecialidadeId(especialidadeId) {
    const rows = await EspecialistaModel.findAll({where: {especialidade_id: especialidadeId}});
    return rows
 }
 
 async function findByUsername(username) {
    return await EspecialistaModel.findOne({where:{username: username}})
}

async function create(especialista) {
    especialista.password = auth.cryptPassword(especialista.password)
    const result = await EspecialistaModel.create(especialista)
    return result;
}



export default {findAll, create, findAllByEspecialidadeId, findByUsername}