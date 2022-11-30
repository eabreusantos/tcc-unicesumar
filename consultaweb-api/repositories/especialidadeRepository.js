import EspecialidadeModel from '../models/especialidadeModel.js'

async function findAll() {
   const users = await EspecialidadeModel.findAll();
   return users
}


export default {findAll}