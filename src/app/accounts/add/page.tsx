'use client';

import Link from 'next/link';
import AccountForm from '@/app/accounts/AccountForm';
import { BiArrowBack } from 'react-icons/bi';
import { addAccount } from '@/utils/accountCRUD';

function AddAccountPage() {
    const add = async (account: accountFormData) => addAccount(account);

    return (
        <div className="p-1">
            <Link
                href="/accounts"
                className="mx-1 px-2 py-1 text-white bg-blue-500 rounded-md inline-flex">
                <BiArrowBack />
            </Link>

            <h3>Add a new account</h3>

            <AccountForm onSubmit={add} buttonLabel="Create Account" />
        </div>
    );
}

export default AddAccountPage;
