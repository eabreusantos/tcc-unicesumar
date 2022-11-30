import userRepository from "../repositories/userRepository.js";

async function getAll (req, res) {
    const users = await userRepository.findAll()
    return res.json(users)
}

async function create(req, res) {
    await userRepository.create(req.body);
    return res.status(201).send()
}

export default { getAll, create }