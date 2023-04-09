'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { roundAmount } from '@/utils/currency';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { getAccountDetails, getAccountList } from '@/utils/accountCRUD';

type props = {
    onSubmit: (account: accountFormData) => Promise<void>;
    acctId?: string;
    buttonLabel: string;
};

function AccountForm({ onSubmit, acctId, buttonLabel }: props) {
    const router = useRouter();

    const acctEmpty: accountFormData = {
        id: '',
        name: '',
        startingBalance: 0,
        currentBalance: 0,
        notes: ''
    };

    const zeroBalance = {
        text: '0.00',
        isPositive: true
    };

    const [acctNames, setAcctNames] = useState<string[]>([]);
    const [formDataOrig, setFormDataOrig] = useState<accountFormData>(acctEmpty);
    const [formData, setFormData] = useState<accountFormData>(acctEmpty);

    const [startingBalance, setStartingBalance] = useState(zeroBalance);
    const [currentBalance, setCurrentBalance] = useState(zeroBalance);

    useEffect(() => {
        const getNames = async () => {
            const res = await getAccountList();
            const accounts = res.data ?? [];
            setAcctNames(accounts.map((account: accountDetails) => account.name));
        };

        const getAcctOrig = async () => {
            let account: accountDetails | null = null;
            if (acctId) {
                const res = await getAccountDetails(acctId ?? '');
                account = res.data ? res.data[0] : null;
            }

            if (account) {
                const startingBalance = roundAmount(account.first_trans.amount);
                const currentBalance = roundAmount(account.current_balance);
                const isCurrentPositive = account.current_balance >= 0;

                setFormDataOrig({
                    id: account.id,
                    name: account.name,
                    startingBalance:
                        startingBalance * (account.first_trans.type === 'INCOME' ? 1 : -1),
                    currentBalance: currentBalance,
                    notes: account.notes
                });
                setFormData({
                    id: account.id,
                    name: account.name,
                    startingBalance:
                        startingBalance * (account.first_trans.type === 'INCOME' ? 1 : -1),
                    currentBalance: currentBalance,
                    notes: account.notes
                });

                setStartingBalance({
                    text: startingBalance.toFixed(2),
                    isPositive: account.first_trans.type === 'INCOME'
                });

                setCurrentBalance({
                    text: Math.abs(currentBalance).toFixed(2),
                    isPositive: isCurrentPositive
                });
            }
        };

        getNames();
        getAcctOrig();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFormData({
            ...formData,
            startingBalance: Number(startingBalance.text) * (startingBalance.isPositive ? 1 : -1)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startingBalance]);

    useEffect(() => {
        setFormData({
            ...formData,
            currentBalance: Number(currentBalance.text) * (currentBalance.isPositive ? 1 : -1)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBalance]);

    const submitForm = () => {
        if (JSON.stringify(formDataOrig) === JSON.stringify(formData)) return;

        // Makes sure that name submitted is not already exisiting
        if (acctNames.includes(formData.name) && formDataOrig.name !== formData.name) return;

        onSubmit(formData);
        router.push('/accounts');
        router.refresh();
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                submitForm();
            }}
            className="flex flex-col p-1 space-y-3">
            <div className="flex flex-col space-y-1">
                <p className="text-sm text-gray-500 py-1">Account Name</p>
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    required
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="my-1 px-1 border-b-2"
                />
            </div>
            {/* TODO: ensure balance sign changes on button click */}
            <div className="flex flex-col space-y-1">
                <p className="text-sm text-gray-500 py-1">Starting Balance</p>
                <div className="flex">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setStartingBalance({
                                ...startingBalance,
                                isPositive:
                                    formData.startingBalance === 0 || !startingBalance.isPositive
                            });
                        }}>
                        <div
                            className={`mx-2 
                        ${!startingBalance.isPositive && 'bg-red-600 rounded-md'} 
                        ${startingBalance.isPositive && 'bg-green-600 rounded-md'} 
                        `}>
                            {!startingBalance.isPositive && <BiMinus size={28} color="white" />}
                            {startingBalance.isPositive && <BiPlus size={28} color="white" />}
                        </div>
                    </button>

                    <input
                        type="tel"
                        min="0"
                        placeholder="0.00"
                        value={startingBalance.text}
                        required
                        onKeyDown={(e) => {
                            if (e.key === '-' || e.key === '+') e.preventDefault();
                        }}
                        onChange={(e) =>
                            setStartingBalance({ ...startingBalance, text: e.target.value })
                        }
                        onBlur={(e) => {
                            const amount = roundAmount(e.target.value);

                            setStartingBalance({
                                text: Math.abs(amount).toFixed(2),
                                isPositive:
                                    (startingBalance.isPositive && amount > 0) || amount === 0
                            });
                        }}
                        onFocus={(e) => e.target.select()}
                        className="my-1 px-1 flex-grow border-b-2"
                    />
                </div>
            </div>

            {JSON.stringify(formDataOrig) !== JSON.stringify(acctEmpty) && (
                <div className="flex flex-col space-y-1">
                    <p className="text-sm text-gray-500 py-1">Current Balance</p>

                    <div className="flex">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentBalance({
                                    ...currentBalance,
                                    isPositive:
                                        formData.startingBalance === 0 || !currentBalance.isPositive
                                });
                            }}>
                            <div
                                className={`mx-2 
                        ${!currentBalance.isPositive && 'bg-red-600 rounded-md'} 
                        ${currentBalance.isPositive && 'bg-green-600 rounded-md'} 
                        `}>
                                {!currentBalance.isPositive && <BiMinus size={28} color="white" />}
                                {currentBalance.isPositive && <BiPlus size={28} color="white" />}
                            </div>
                        </button>

                        <input
                            type="tel"
                            placeholder="0.00"
                            value={currentBalance.text}
                            required
                            onKeyDown={(e) => {
                                if (e.key === '-' || e.key === '+') e.preventDefault();
                            }}
                            onChange={(e) =>
                                setCurrentBalance({ ...currentBalance, text: e.target.value })
                            }
                            onBlur={(e) => {
                                const amount = roundAmount(e.target.value);

                                setCurrentBalance({
                                    text: Math.abs(amount).toFixed(2),
                                    isPositive:
                                        (currentBalance.isPositive && amount > 0) || amount === 0
                                });
                            }}
                            onFocus={(e) => e.target.select()}
                            className="my-1 px-1 flex-grow border-b-2"
                        />
                    </div>
                </div>
            )}

            <div className="flex flex-col space-y-1">
                <p className="text-sm text-gray-500 py-1">Notes</p>
                <input
                    placeholder="Notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="my-1 px-1 border-b-2"
                />
            </div>

            <button type="submit" className=" mx-1 px-2 py-1 text-white bg-blue-500 rounded-md">
                {buttonLabel}
            </button>
        </form>
    );
}

export default AccountForm;
