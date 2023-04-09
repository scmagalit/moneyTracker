'use client';

import Link from 'next/link';
import AccountForm from '@/app/accounts/AccountForm';
import { BiArrowBack } from 'react-icons/bi';
import { updateAccount } from '@/utils/accountCRUD';

type PageProps = {
    params: {
        acctId: string;
    };
};

function UpdateAccountPage({ params: { acctId } }: PageProps) {
    const update = (account: accountFormData) => updateAccount(account);

    return (
        <div className="p-1">
            <Link
                href="/accounts"
                className="mx-1 px-2 py-1 text-white bg-blue-500 rounded-md inline-flex">
                <BiArrowBack />
            </Link>

            <h3>Update this account: {acctId}</h3>

            <AccountForm onSubmit={update} acctId={acctId} buttonLabel="Update Account" />
        </div>
    );
}

export default UpdateAccountPage;
