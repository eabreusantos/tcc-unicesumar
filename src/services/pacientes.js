import { getAxiosClient } from "./client";

export function getAllAgendamentos(pacienteId) {
    const client = getAxiosClient();
    return client.get(`/agendamentos/${pacienteId}`);
}

export function agendar(pacienteId, disponibilidade_id) {
    const client = getAxiosClient();
    return client.put('/agendamento/' + pacienteId, {
        disponibilidade_id: disponibilidade_id
    })
}

export function cancelAgendamento(agendamentoId, pacienteId) {
    const client = getAxiosClient();
    return client.delete(`/agendamentos/${agendamentoId}/${pacienteId}`)

}

export function createUser(paciente) {
    const client = getAxiosClient(true);
    return client.post("/users", paciente)
}