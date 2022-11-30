import express from "express";
import userHandler from "./handlers/userHandler.js";
import especialidadeHandler from "./handlers/especialidadeHandler.js";
import especialistaHandler from "./handlers/especialistaHandler.js";
import disponibilidadeHandler from "./handlers/disponibilidadeHandler.js";
import authHandler from "./handlers/authHandler.js";
import authMiddleware from "./middlewares/authMiddleware.js";

const routes = express.Router()


routes.get('/', (req, res) => {
    res.json({hello: 'world'})
})

routes.post('/auth', authHandler.authLogin)

/**
 * User Endpoints
 */
routes.get('/users', authMiddleware.authenticateJWT, userHandler.getAll)
routes.post('/users', userHandler.create)

/**
 * Especialistas Endpoints
 */
routes.get('/especialistas', authMiddleware.authenticateJWT, especialistaHandler.getAll)
routes.get('/especialistas/especialidade/:especialidadeId', authMiddleware.authenticateJWT, especialistaHandler.getAllByEspecialidadeId)
routes.post('/especialistas', authMiddleware.authenticateJWT, especialistaHandler.create)

/**
 * Disponibilidades Endpoints
 */
routes.get('/disponibilidades', authMiddleware.authenticateJWT, disponibilidadeHandler.getAll)
routes.post('/disponibilidades/:especialistaId', authMiddleware.authenticateJWT, disponibilidadeHandler.createForEspecialista)
routes.get('/disponibilidades/:especialistaId', authMiddleware.authenticateJWT, disponibilidadeHandler.getAllByEspecialista)
routes.get('/disponibilidades/:especialistaId/all', authMiddleware.authenticateJWT, disponibilidadeHandler.getAllByEspecialistaAll)
routes.delete('/disponibilidades/:id', authMiddleware.authenticateJWT, disponibilidadeHandler.remove)

routes.put('/agendamento/:pacienteId', authMiddleware.authenticateJWT, disponibilidadeHandler.createAgendamento)
routes.get('/agendamentos/:pacienteId', authMiddleware.authenticateJWT, disponibilidadeHandler.getAllByPacienteId)
routes.get('/agendamentos/especialista/:especialistaId', authMiddleware.authenticateJWT, disponibilidadeHandler.getAllByEspecialistaIdFilled)
routes.delete('/agendamentos/:disponibilidadeId/:pacienteId', authMiddleware.authenticateJWT, disponibilidadeHandler.cancelAgendamento)

/**
 * Especialidades endpoint
 */
routes.get('/especialidades', authMiddleware.authenticateJWT, especialidadeHandler.getAll)

export {routes as default};