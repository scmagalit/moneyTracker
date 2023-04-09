import { getAccountDetails } from '@/utils/accountCRUD';
import { formatAmount, roundAmount } from '@/utils/currency';
import { displayDateFormat } from '@/utils/datetime';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BiArrowBack, BiMinus, BiPlus } from 'react-icons/bi';

export const revalidate = 0;

type PageProps = {
    params: {
        acctId: string;
    };
};

async function AccountPage({ params: { acctId } }: PageProps) {
    const res = await getAccountDetails(acctId);
    const acct = res.data ? res.data[0] : null;

    if (!acct) return notFound();

    const createdDateTime = new Date(acct.created_at);
    const updatedDateTime = new Date(acct.updated_at);

    const startingBalance = acct.first_trans.amount;
    const isStartingPositive = acct.first_trans.type === 'INCOME';

    return (
        <div className="p-1 space-y-3">
            <Link
                href="/accounts"
                className="mx-1 px-2 py-1 text-white bg-blue-500 rounded-md inline-flex">
                <BiArrowBack />
            </Link>

            <div className="space-y-1">
                <p className="text-sm text-gray-500 py-1">Account Name</p>
                <p className="text-xl font-bold px-1">{acct.name}</p>
            </div>

            <div className="space-y-1">
                <p className="text-sm text-gray-500 py-1">Opening Date</p>
                <p className="px-1 text-lg">{displayDateFormat(createdDateTime)}</p>
            </div>

            <div className="space-y-1">
                <p className="text-sm text-gray-500 py-1">Starting balance</p>
                <div className="flex flex-row items-center justify-between px-1">
                    <div
                        className={`rounded-md 
                        ${isStartingPositive ? 'bg-green-600' : 'bg-red-600'} 
                        `}>
                        {isStartingPositive && <BiPlus size={28} color="white" />}
                        {!isStartingPositive && <BiMinus size={28} color="white" />}
                    </div>
                    <p className="text-lg">{formatAmount(roundAmount(startingBalance))}</p>
                </div>
            </div>

            <div className="space-y-1">
                <p className="text-sm text-gray-500 py-1">
                    {`Current balance (as of ${displayDateFormat(updatedDateTime)})`}
                </p>
                <div className="flex flex-row items-center justify-between px-1">
                    <div
                        className={`rounded-md 
                    ${acct.current_balance >= 0 ? 'bg-green-600' : 'bg-red-600'} 
                    `}>
                        {acct.current_balance >= 0 && <BiPlus size={28} color="white" />}
                        {acct.current_balance < 0 && <BiMinus size={28} color="white" />}
                    </div>
                    <p className="text-xl font-bold">
                        {formatAmount(Math.abs(roundAmount(acct.current_balance)))}
                    </p>
                </div>
            </div>

            <div className="space-y-1">
                <p className="text-sm text-gray-500 py-1">Notes</p>
                <p
                    className={`px-1
                ${acct.notes === '' && 'text-gray-300'}`}>
                    {acct.notes === '' ? 'N/A' : acct.notes}
                </p>
            </div>
        </div>
    );
}

export default AccountPage;
