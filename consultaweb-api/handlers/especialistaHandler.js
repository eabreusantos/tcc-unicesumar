import especialistaRepository from "../repositories/especialistaRepository.js";

async function getAll (req, res) {
    const rows = await especialistaRepository.findAll()
    return res.json(rows)
}

async function getAllByEspecialidadeId(req, res) {
    const rows = await especialistaRepository.findAllByEspecialidadeId(req.params.especialidadeId)
    return res.json(rows)
}

async function create(req, res) {
    await especialistaRepository.create(req.body);
    return res.status(201).send()
}

export default { getAll, create, getAllByEspecialidadeId }