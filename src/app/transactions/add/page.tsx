'use client';

import Link from 'next/link';
import TransactionForm from '@/app/transactions/TransactionForm';
import { BiArrowBack } from 'react-icons/bi';
import { addTransaction } from '@/utils/transactionCRUD';

function AddTransaction() {
    const add = async (transaction: transactionFormData) => addTransaction(transaction);

    return (
        <div className="p-1">
            <Link
                href="/transactions"
                className="mx-1 px-2 py-1 text-white bg-blue-500 rounded-md inline-flex">
                <BiArrowBack />
            </Link>

            <h3>Add a new transaction</h3>

            <TransactionForm onSubmit={add} buttonLabel="Create Transaction" />
        </div>
    );
}

export default AddTransaction;
