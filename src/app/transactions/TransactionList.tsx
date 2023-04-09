import { formatAmount, roundAmount } from '@/utils/currency';
import { displayDateFormat } from '@/utils/datetime';
import { getTransactionList } from '@/utils/transactionCRUD';
import Link from 'next/link';
import OptionsBar from '@/components/OptionsBar';

type TransactionRowProps = {
    tran: transactionDetails;
    isPositive: boolean;
    account: {
        id: string;
        name: string;
    } | null;
};

function TransactionRow({ tran, isPositive, account }: TransactionRowProps) {
    return (
        <div className="flex flex-row p-1 items-center hover:bg-slate-100">
            <Link
                href={
                    tran.is_first_trans
                        ? `/accounts/${tran.account_from.id}`
                        : `/transactions/${tran.id}`
                }
                className="flex flex-grow justify-between overflow-x-hidden">
                <div className="w-2/4">
                    <p className="mx-1 font-bold text-lg truncate">{tran.name}</p>
                    <p className="mx-1 text-sm truncate">{tran.category.name}</p>
                    <p className="mx-1 text-sm italic truncate">{tran.notes}</p>
                </div>

                <div className="flex flex-col items-end w-2/4">
                    <p
                        className={`mx-1 text-lg font-bold 
                            ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {`${isPositive ? '+' : '-'}${formatAmount(roundAmount(tran.amount))}`}
                    </p>
                    <p className="mx-1 text-sm">{account?.name}</p>
                </div>
            </Link>

            {!tran.is_first_trans && <OptionsBar id={tran.id} page="transactions" />}
            {tran.is_first_trans && <OptionsBar id={tran.account_from.id} page="accounts" />}
        </div>
    );
}

type Group = {
    [key: string]: {
        date: string;
        total: number;
        trans: transactionDetails[];
    };
};

async function TransactionList() {
    const res = await getTransactionList();

    const allTrans = res.data ?? [];

    const transactionGroup = Object.values(
        allTrans.reduce((group: Group, tran) => {
            const recordDateTime = new Date(tran.recorded_at);
            const date = displayDateFormat(recordDateTime);

            if (!group[date]) {
                group[date] = { date: date, total: 0, trans: [] };
            }

            group[date].trans.push(tran);

            if (tran.type === 'INCOME') group[date].total += roundAmount(tran.amount);

            if (tran.type === 'EXPENSE') group[date].total -= roundAmount(tran.amount);

            return group;
        }, {})
    );

    return (
        <div className="flex flex-col space-y-4 py-1">
            {transactionGroup?.map((group) => (
                <div key={group.date} className="space-y-2">
                    <div className="flex flex-row  p-1 bg-slate-200 rounded-xl">
                        <div className="flex flex-row flex-grow justify-between">
                            <p className="text-sm">{group.date}</p>
                            <p className="text-sm font-bold">
                                {formatAmount(roundAmount(group.total))}
                            </p>
                        </div>
                        <div className="px-10"></div>
                    </div>

                    {group.trans?.map((tran) => (
                        <div key={tran.id}>
                            {tran.type === 'TRANSFER' && (
                                <TransactionRow
                                    tran={tran}
                                    isPositive={true}
                                    account={tran.account_to}
                                />
                            )}
                            <TransactionRow
                                tran={tran}
                                isPositive={tran.type === 'INCOME'}
                                account={tran.account_from}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default TransactionList;
