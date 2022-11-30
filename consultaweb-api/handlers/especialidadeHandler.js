import especialidadeRepository from "../repositories/especialidadeRepository.js";

async function getAll (req, res) {
    const users = await especialidadeRepository.findAll()
    return res.json(users)
}

export default { getAll }