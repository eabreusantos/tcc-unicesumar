import { getAxiosClient } from "./client";


export function getAllByEspecialidadeId(especialidadeId) {
    const client = getAxiosClient();
    return client.get("/especialistas/especialidade/"+especialidadeId);
}

export function getDisponibilidadesAll(especialistaId) {
    const client = getAxiosClient();
    return client.get("/disponibilidades/"+especialistaId+"/all");
}

export function getDisponibilidades(especialistaId) {
    const client = getAxiosClient();
    return client.get("/disponibilidades/"+especialistaId);
}

export function getAllAgendamentosEspecialista(especialistaId) {
    const client = getAxiosClient();
    return client.get(`/agendamentos/especialista/${especialistaId}`);
}

export function createDisponibilidade(disponibildade) {
    const client = getAxiosClient();
    return client.post("/disponibilidades/"+disponibildade.especialista_id, disponibildade)
}

export function removeDisponibilidade(id) {
    const client = getAxiosClient();
    return client.delete(`/disponibilidades/${id}`)

}

export function cancelAgendamento(agendamentoId, pacienteId) {
    const client = getAxiosClient();
    return client.delete(`/agendamentos/${agendamentoId}/${pacienteId}`)

}