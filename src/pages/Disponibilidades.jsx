import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Button from '../components/elements/button';
import Modal from '../components/elements/modal';
import usePageLoading from '../hooks/usePageLoading';
import { createDisponibilidade, getDisponibilidadesAll, removeDisponibilidade } from '../services/especialistas';
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import useToast from '../hooks/useToast';
import { getDateTimeFormatted } from '../utils/datetime';
import useToken from '../hooks/useToken';
import DisponibilidadeForm from '../components/disponibilidadeForm';

export default function Disponibilidades() {

    const [rows, setRows] = useState([]);
    const [create, setCreate] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState();
    const {setIsLoadingActive} = usePageLoading();
    const {showToast} = useToast();
    const {token} = useToken()

    function fetchData() {
        setIsLoadingActive(true);
        getDisponibilidadesAll(token.id)
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
            name: 'Horário',
            selector: row => getDateTimeFormatted(row.horario)
        },
        {
            name: 'Preenchida?',
            selector: row => (row.paciente_id)? "Sim" : "Não"
        },
        {
            name: 'Ações',
            selector: getActions
        }
    ];

    function getActions(row) {
        if (!row.paciente_id) {
            return (<span>
                <button className={'text-orange-500'} title='Remover esta disponibilidade' onClick={() => cancelDisponibilidadeAction(row)}>Remover disponibilidade</button>
            </span>)
        }
        return <>Não é possível remover</>

    }

    function cancelDisponibilidadeAction(row) {
        if (confirm('Deseja realmente remover esta disponibilidade?')) {       
            setIsLoadingActive(true);
            removeDisponibilidade(row.id)
            .then((response) => {
                showToast('Disponibilidade removida com sucesso', 'success')
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

        createDisponibilidade(data)
        .then((response) => {
            showToast('Disponibilidade cadastrada com sucesso', 'success')
            fetchData();
            setCreate(false)
        }).catch((err) => {
            showToast('Ocorreu um erro ao tentar remover', 'error')
        }).finally(() => {
            setIsLoadingActive(false);
        })
    }


    return (
    <div>
        <div className='mb-2 mr-2 float-right'>
            <Button onClick={() => setCreate(true)}><PlusCircleIcon width={18} className='pt-1 mr-1 text-white float-left' /> Adicionar disponibilidade</Button>
        </div>
        <h5 className="font-medium leading-tight text-xl mt-0 mb-2 text-orange-600">Minhas Disponibilidades</h5>
        <DataTable persistTableHead columns={columns} data={rows} pagination></DataTable>

        {create &&
        <Modal>
            <DisponibilidadeForm especialistaId={token.id} onSubmit={onSubmitCreate} onClose={() => setCreate(false) } />
        </Modal>}
    </div>
    )
}