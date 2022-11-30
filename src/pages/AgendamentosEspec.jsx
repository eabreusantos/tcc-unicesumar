import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import usePageLoading from '../hooks/usePageLoading';
import { getAllAgendamentosEspecialista, cancelAgendamento } from '../services/especialistas';
import useToast from '../hooks/useToast';
import { getDateTimeFormatted } from '../utils/datetime';
import useToken from '../hooks/useToken';

export default function AgendamentosEspec() {

    const [rows, setRows] = useState([]);
    const {setIsLoadingActive} = usePageLoading();
    const {showToast} = useToast();
    const {token} = useToken()

    function fetchData() {
        setIsLoadingActive(true);
        getAllAgendamentosEspecialista(token.id)
            .then((response) => {
                setRows(response.data)
            })
            .catch((err) => {
                showToast('Ocorreu um erro ao tentar carregar os dados', 'error')
                console.log(err);
            })
            .finally(() => {
                setIsLoadingActive(false);
            })
            ;
    }

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            name: 'Paciente',
            selector: row => row.User.name
        },
        {
            name: 'Horário',
            selector: row => getDateTimeFormatted(row.horario)
        },
        {
            name: 'Ações',
            selector: row => (
            <span>
                <button className={'text-orange-500'} title='Cancelar este agendamento' onClick={() => cancelAgendamentoAction(row)}>Cancelar Agendamento</button>
            </span>
            )
        }
    ];

    function cancelAgendamentoAction(row) {
        if (confirm('Deseja realmente cancelar este agendamento?')) {       
            setIsLoadingActive(true);
            cancelAgendamento(row.id, token.id)
            .then((response) => {
                showToast('Agendamento cancelado com sucesso', 'success')
                fetchData();
            }).catch((err) => {
                showToast('Ocorreu um erro ao tentar remover', 'error')
            }).finally(() => {
                setIsLoadingActive(false);
            });
        }

    }

    return (
    <div>
        <h5 className="font-medium leading-tight text-xl mt-0 mb-2 text-orange-600">Meus Agendamentos</h5>
        <DataTable persistTableHead columns={columns} data={rows} pagination></DataTable>
    </div>
    )
}