import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Button from '../components/elements/button';
import Modal from '../components/elements/modal';
import usePageLoading from '../hooks/usePageLoading';
import { getAllAgendamentos, cancelAgendamento, agendar } from '../services/pacientes';
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/20/solid'
import useToast from '../hooks/useToast';
import AgendamentoForm from '../components/agendamentoForm';
import { getDateTimeFormatted } from '../utils/datetime';
import useToken from '../hooks/useToken';

export default function Agendamentos() {

    const [rows, setRows] = useState([]);
    const [create, setCreate] = useState(false);
    const {setIsLoadingActive} = usePageLoading();
    const {showToast} = useToast();
    const {token} = useToken()

    function fetchData() {
        setIsLoadingActive(true);
        getAllAgendamentos(token.id)
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
            name: 'Especialista',
            selector: row => row.Especialistum.name
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
        if (confirm('Deseja realmente cancelar esta consulta?')) {       
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

    function onSubmitCreate(data) {
        setIsLoadingActive(true);

        agendar(token.id, data.disponibilidade_id)
        .then((response) => {
            showToast('Agendamento realizado com sucesso', 'success')
            fetchData();
            setCreate(false)
        }).catch((err) => {
            showToast('Ocorreu um erro ao tentar agendar, tente novamente!', 'error')
            console.error(err);
        }).finally(() => {
            setIsLoadingActive(false);
        })
    }


    return (
    <div>
        <div className='mb-2 mr-2 float-right'>
            <Button onClick={() => setCreate(true)}><PlusCircleIcon width={18} className='pt-1 mr-1 text-white float-left' /> Agendar um especialista</Button>
        </div>
        <h5 className="font-medium leading-tight text-xl mt-0 mb-2 text-orange-600">Meus Agendamentos</h5>
        <DataTable persistTableHead columns={columns} data={rows} pagination></DataTable>

        {create &&
        <Modal>
            <AgendamentoForm onSubmit={onSubmitCreate} onClose={() => setCreate(false) } />
        </Modal>}
    </div>
    )
}