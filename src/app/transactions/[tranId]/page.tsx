import { displayDateFormat, displayTimeFormat } from '@/utils/datetime';
import { formatAmount, roundAmount } from '@/utils/currency';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BiArrowBack, BiCalendarAlt, BiTimeFive } from 'react-icons/bi';
import { getTransactionDetails } from '@/utils/transactionCRUD';
import { BsArrowRight } from 'react-icons/bs';
import TranTypeButton from '../TranTypeButton';

export const revalidate = 0;

type PageProps = {
    params: {
        tranId: string;
    };
};

async function TransactionPage({ params: { tranId } }: PageProps) {
    const res = await getTransactionDetails(tranId);
    const tran = res.data ? res.data[0] : null;

    if (!tran) return notFound();

    const recordDateTime = new Date(tran.recorded_at);

    return (
        <div className="p-1 space-y-3">
            <Link
                href="/transactions"
                className="mx-1 px-2 py-1 text-white bg-blue-500 rounded-md inline-flex">
                <BiArrowBack />
            </Link>

            <div className="space-y-1">
                <p className="text-sm text-gray-500 py-1">Transaction Name</p>
                <p className="text-xl px-1">{tran.name}</p>
            </div>

            <div className="space-y-1">
                <p className="text-sm text-gray-500 py-1">Amount</p>
                <div className="flex flex-row items-center space-x-2 px-1">
                    <TranTypeButton type={tran.type} />
                    <p className="text-xl font-bold flex-grow">
                        {formatAmount(roundAmount(tran.amount))}
                    </p>
                </div>
            </div>

            <div className="space-y-1">
                <p className="text-sm text-gray-500 py-1">Date/Time Recorded</p>
                <div className="flex flex-row items-center space-x-6 px-1">
                    <div className="flex flex-row items-center space-x-3">
                        <p className="">{displayDateFormat(recordDateTime)}</p>
                        <BiCalendarAlt />
                    </div>
                    <div className="flex flex-row items-center space-x-3">
                        <p className="">{displayTimeFormat(recordDateTime)}</p>
                        <BiTimeFive />
                    </div>
                </div>
            </div>

            <div className="space-y-1">
                <p className="text-sm text-gray-500 py-1">Category</p>
                <p className="px-1 text-lg">{tran.category.name}</p>
            </div>

            <div className="flex flex-row items-center">
                <div className="space-y-1">
                    <p className="text-sm text-gray-500 py-1">
                        {`${tran.type === 'TRANSFER' ? 'From a' : 'A'}ccount`}
                    </p>
                    <p className="px-1 text-lg">{tran.account_from.name}</p>
                </div>
                {tran.type === 'TRANSFER' && (
                    <div className="mx-8">
                        <BsArrowRight size={24} color="gray" />
                    </div>
                )}
                {tran.type === 'TRANSFER' && (
                    <div className="space-y-1">
                        <p className="text-sm text-gray-500 py-1">To account</p>
                        <p className="px-1 text-lg">{tran.account_to?.name}</p>
                    </div>
                )}
            </div>

            <div className="space-y-1">
                <p className="text-sm text-gray-500 py-1">Notes</p>
                <p className="px-1">{tran.notes}</p>
            </div>
        </div>
    );
}

export default TransactionPage;
