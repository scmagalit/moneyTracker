import { getAccountList } from '@/utils/accountCRUD';
import { formatAmount, roundAmount } from '@/utils/currency';
import Link from 'next/link';
import OptionsBar from '@/components/OptionsBar';

async function AccountList() {
    const res = await getAccountList();
    const accounts = res.data ?? [];
    const total = accounts.reduce(
        (total: number, account) => (total += account.current_balance),
        0
    );
    return (
        <div className="flex flex-col space-y-2 py-1">
            <div className="flex flex-row  p-1 bg-slate-200 rounded-xl">
                <div className="flex flex-row flex-grow justify-between">
                    <p className="text-xl font-bold">Net Balance</p>
                    <p
                        className={`text-xl font-bold
                    ${total > 0 && 'text-green-500'}
                    ${total < 0 && 'text-red-500'}
                    ${total == 0 && 'text-gray-500'}`}>
                        {formatAmount(roundAmount(total))}
                    </p>
                </div>
                <div className="px-10"></div>
            </div>

            {/* <div className="flex flex-row px-1">
                <div className="flex flex-row flex-grow justify-between items-center">
                    <p className="text-gray-500">Account Name</p>
                    <p className="text-gray-500">Current Balance</p>
                </div>
                <div className="px-10"></div>
            </div> */}
            {accounts?.map((acct: any) => (
                <div key={acct.id} className="flex flex-row p-1 items-center hover:bg-slate-100">
                    <Link
                        href={`/accounts/${acct.id}`}
                        className="flex flex-row flex-grow justify-between">
                        <p className="mx-1 font-bold text-lg">{acct.name}</p>
                        <p
                            className={`mx-1 font-bold text-lg 
                            ${acct.current_balance > 0 && 'text-green-500'}
                            ${acct.current_balance < 0 && 'text-red-500'}
                            ${acct.current_balance == 0 && 'text-gray-500'}
                            }`}>
                            {formatAmount(roundAmount(acct.current_balance))}
                        </p>
                    </Link>

                    <OptionsBar id={acct.id} page="accounts" />
                </div>
            ))}
        </div>
    );
}

export default AccountList;
