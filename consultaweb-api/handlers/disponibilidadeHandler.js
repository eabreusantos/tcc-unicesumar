import disponibilidadeRepository from "../repositories/disponibilidadeRepository.js";

async function getAll (req, res) {
    const rows = await disponibilidadeRepository.findAll()
    return res.json(rows)
}

async function createForEspecialista(req, res) {
    await disponibilidadeRepository.createForEspecialista(req.params.especialistaId, req.body)
    res.status(201).send();
}

async function createAgendamento(req, res) {
    await disponibilidadeRepository.createAgendamento(req.params.pacienteId, req.body.disponibilidade_id)
    res.status(200).send()
}

async function getAllByEspecialista(req, res) {
    const rows = await disponibilidadeRepository.findAllByEspecialistaId(req.params.especialistaId)
    return res.json(rows)
}

async function getAllByEspecialistaAll(req, res) {
    const rows = await disponibilidadeRepository.findAllByEspecialistaIdAll(req.params.especialistaId)
    return res.json(rows)
}

async function getAllByPacienteId(req, res) {
    const rows = await disponibilidadeRepository.findAllByPacienteId(req.params.pacienteId)
    return res.json(rows)
}

async function cancelAgendamento(req, res) {
    await disponibilidadeRepository.cancelAgendamento(req.params.disponibilidadeId, req.params.pacienteId)
    return res.sendStatus(200)
}

async function getAllByEspecialistaIdFilled(req, res) {
    const rows = await disponibilidadeRepository.findAllByEspecialistaIdFilled(req.params.especialistaId)
    return res.json(rows)
}
async function remove(req, res) {
    const result = await disponibilidadeRepository.removeById(req.params.id)
    return res.sendStatus(200)
}

export default { getAll, createForEspecialista, createAgendamento, getAllByEspecialista, getAllByPacienteId, cancelAgendamento, getAllByEspecialistaIdFilled, getAllByEspecialistaAll, remove }