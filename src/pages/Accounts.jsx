import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Button from '../components/elements/button';
import Modal from '../components/elements/modal';
import usePageLoading from '../hooks/usePageLoading';
import { getAll, remove, save } from '../services/accounts';
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/20/solid'
import useToast from '../hooks/useToast';
import AccountForm from '../components/accountForm';

export default function Accounts() {

    const [accounts, setAccounts] = useState([]);
    const [create, setCreate] = useState(false);
    const [update, setUpdate] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState();
    const {setIsLoadingActive} = usePageLoading();
    const {showToast} = useToast();

    function fetchData() {
        setIsLoadingActive(true);
        getAll()
            .then((response) => {
                setAccounts(response.data)
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
            name: 'Nome',
            selector: row => row.name
        },
        {
            name: 'Username',
            selector: row => row.username
        },
        {
            name: 'Ações',
            selector: row => (
            <span>
                <button className='mr-1' onClick={() => editAccountAction(row)}><PencilSquareIcon width={25} className='text-orange-500' /></button>
                <button onClick={() => removeAccountAction(row)}><TrashIcon width={25} className='text-orange-500' /></button>
            </span>
            )
        }
    ];

    function removeAccountAction(row) {
        setIsLoadingActive(true);
        remove(row.id)
        .then((response) => {
            showToast('Conta removido com sucesso', 'success')
            fetchData();
        }).catch((err) => {
            showToast('Ocorreu um erro ao tentar remover', 'error')
        }).finally(() => {
            setIsLoadingActive(false);
        });
    }

    function editAccountAction(row) {
        setSelectedAccount(row);
        setUpdate(true);
    }

    function onSubmitCreate(data) {
        setIsLoadingActive(true);
        save(data)
        .then((response) => {
            showToast('Conta adicionado com sucesso', 'success')
            fetchData();
            setCreate(false);
        })
        .catch((err) => {
            showToast('Ocorreu um erro ao tentar cadastrar, tente novamente', 'error')
            console.error(err);
        }).finally(() => {
            setIsLoadingActive(false);
        })
    }

    function onSubmitUpdate(data) {
        setIsLoadingActive(true);
        save(data, selectedAccount.id)
        .then((response) => {
            showToast('Conta alterada com sucesso', 'success')
            fetchData();
            setUpdate(false);
        })
        .catch((err) => {
            showToast('Ocorreu um erro ao tentar alterar, tente novamente!', 'error')
            console.error(err);
        }).finally(() => {
            setIsLoadingActive(false);
        })
    }


    return (
    <div>
        <div className='mb-2 mr-2 float-right'>
            <Button onClick={() => setCreate(true)}><PlusCircleIcon width={18} className='pt-1 mr-1 text-white float-left' /> Novo</Button>
        </div>
        <h5 className="font-medium leading-tight text-xl mt-0 mb-2 text-orange-600">Cadastro de Pacientes</h5>
        <DataTable columns={columns} data={accounts} pagination></DataTable>

        {create &&
        <Modal>
            <AccountForm account={undefined} onSubmit={onSubmitCreate} onClose={() => setCreate(false) } />
        </Modal>}

        {update &&
        <Modal>
            <AccountForm account={selectedAccount} onSubmit={onSubmitUpdate} onClose={() => setUpdate(false) } />
        </Modal>}
    </div>
    )
}