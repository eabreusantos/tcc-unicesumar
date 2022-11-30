import { Op } from 'sequelize';
import DisponibilidadeModel from '../models/disponibilidadeModel.js'
import Especialista from '../models/especialistaModel.js'
import userModel from '../models/userModel.js';

async function findAll() {
   const rows = await DisponibilidadeModel.findAll();
   return rows
}

async function createForEspecialista(especialistaId, disponibilidade) {
   const result = await DisponibilidadeModel.create({especialista_id: especialistaId, ...disponibilidade})
   return result;
}

async function createAgendamento(pacienteId, disponibilidadeId) {
   const result = await DisponibilidadeModel.update({paciente_id: pacienteId}, {where: {id: disponibilidadeId}})
   return result
}

async function findAllByEspecialistaId(especialistaId) {
   return await DisponibilidadeModel.findAll({where: { especialista_id: especialistaId, paciente_id: null }})
}

async function findAllByEspecialistaIdAll(especialistaId) {
   return await DisponibilidadeModel.findAll({where: { especialista_id: especialistaId }})
}


async function findAllByEspecialistaIdFilled(especialistaId) {
   return await DisponibilidadeModel.findAll({include: userModel, where: { especialista_id: especialistaId, paciente_id: {[Op.ne]: null} }})
}

async function findAllByPacienteId(pacienteId) {
   return await DisponibilidadeModel.findAll({where: { paciente_id: pacienteId }, include: Especialista})
}

async function cancelAgendamento(disponibilidadeId, pacienteId) {
   const result = await DisponibilidadeModel.update({paciente_id: null}, {where: {id: disponibilidadeId}})
   return result;
}

async function removeById(id) {
   const result = await DisponibilidadeModel.destroy({where:{id: id}})
   return result;
}

export default {findAll, createForEspecialista, createAgendamento, findAllByEspecialistaId, findAllByPacienteId, cancelAgendamento, findAllByEspecialistaIdFilled, findAllByEspecialistaIdAll, removeById}