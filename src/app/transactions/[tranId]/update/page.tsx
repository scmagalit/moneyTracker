'use client';

import Link from 'next/link';
import TransactionForm from '@/app/transactions/TransactionForm';
import { BiArrowBack } from 'react-icons/bi';
import { updateTransaction } from '@/utils/transactionCRUD';

type PageProps = {
    params: {
        tranId: string;
    };
};

function UpdateTransaction({ params: { tranId } }: PageProps) {
    const update = async (transaction: transactionFormData) => updateTransaction(transaction);

    return (
        <div className="p-1">
            <Link
                href="/transactions"
                className=" mx-1 px-2 py-1 text-white bg-blue-500 rounded-md inline-flex">
                <BiArrowBack />
            </Link>

            <h3>Update this transaction: {tranId}</h3>

            <TransactionForm onSubmit={update} tranId={tranId} buttonLabel="Update Transaction" />
        </div>
    );
}

export default UpdateTransaction;
