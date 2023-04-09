'use client';

import { useEffect, useState } from 'react';
import { formDateFormat, formTimeFormat } from '@/utils/datetime';
import { useRouter } from 'next/navigation';
import { BsArrowRight } from 'react-icons/bs';
import { roundAmount } from '@/utils/currency';
import { getCategoryList } from '@/utils/categoryCRUD';
import { getAccountList } from '@/utils/accountCRUD';
import { getTransactionDetails } from '@/utils/transactionCRUD';
import TranTypeButton from './TranTypeButton';

type props = {
    onSubmit: (transaction: transactionFormData) => Promise<void>;
    tranId?: string;
    buttonLabel: string;
};

type dropdownData = {
    id: string;
    name: string;
};

function TransactionForm({ onSubmit, tranId, buttonLabel }: props) {
    const router = useRouter();

    const now = new Date();
    const tranEmpty: transactionFormData = {
        id: '',
        name: '',
        amount: 0,
        type: 'EXPENSE',
        recordDate: formDateFormat(now),
        recordTime: formTimeFormat(now),
        categoryId: '',
        accountIdFrom: '',
        accountIdTo: null,
        notes: ''
    };

    const [categories, setCategories] = useState<dropdownData[]>([]);
    const [accounts, setAccounts] = useState<dropdownData[]>([]);
    const [formDataOrig, setFormDataOrig] = useState<transactionFormData>(tranEmpty);
    const [formData, setFormData] = useState<transactionFormData>(tranEmpty);

    const [amountText, setAmountText] = useState('0.00');

    useEffect(() => {
        const getCategories = async () => {
            const res = await getCategoryList();
            const categories = res.data ?? [];
            setCategories(categories);
        };

        const getAccounts = async () => {
            const res = await getAccountList();
            const categories = res.data ?? [];
            setAccounts(categories);
        };

        const getTranOrig = async () => {
            let transaction: transactionDetails | null = null;
            if (tranId) {
                const res = await getTransactionDetails(tranId);
                transaction = res.data ? res.data[0] : null;
                console.log(transaction);
            }

            if (transaction) {
                const amount = roundAmount(transaction.amount);
                const recordedDate = new Date(transaction.recorded_at);
                const accountToId = transaction.account_to?.id;

                setFormDataOrig({
                    id: transaction.id,
                    name: transaction.name,
                    amount: amount,
                    type: transaction.type,
                    recordDate: formDateFormat(recordedDate),
                    recordTime: formTimeFormat(recordedDate),
                    accountIdFrom: transaction.account_from.id,
                    accountIdTo: accountToId ?? null,
                    categoryId: transaction.category.id,
                    notes: transaction.notes ?? ''
                });

                setFormData({
                    id: transaction.id,
                    name: transaction.name,
                    amount: amount,
                    type: transaction.type,
                    recordDate: formDateFormat(recordedDate),
                    recordTime: formTimeFormat(recordedDate),
                    accountIdFrom: transaction.account_from.id,
                    accountIdTo: accountToId ?? null,
                    categoryId: transaction.category.id,
                    notes: transaction.notes ?? ''
                });

                setAmountText(amount.toFixed(2));
            }
        };

        getCategories();
        getAccounts();
        getTranOrig();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const switchTranType = () => {
        switch (formData.type) {
            case 'EXPENSE':
                setFormData({ ...formData, type: 'INCOME' });
                break;
            case 'INCOME':
                setFormData({
                    ...formData,
                    type: 'TRANSFER',
                    categoryId: categories.find((category) => category.name === 'Others')?.id ?? ''
                });
                break;
            default:
                setFormData({ ...formData, type: 'EXPENSE', categoryId: '', accountIdTo: null });
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                if (JSON.stringify(formDataOrig) === JSON.stringify(formData)) return;

                onSubmit(formData);
                router.push('/transactions');
                router.refresh();
            }}
            className="flex flex-col">
            {/* Name */}
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                required
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="my-1 px-1 border-b-2"
            />

            <div className="flex my-1 px-1 space-x-2">
                {/* Type */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        switchTranType();
                    }}
                    className="flex space-x-2">
                    <p className="w-14 ">
                        {formData.type.charAt(0).toUpperCase() +
                            formData.type.slice(1).toLowerCase()}
                    </p>

                    <TranTypeButton type={formData.type} />
                </button>

                {/* Amount */}
                <input
                    type="number"
                    placeholder="0.00"
                    value={amountText}
                    required
                    onKeyDown={(e) => {
                        if (e.key === '-' || e.key === '+') e.preventDefault();
                    }}
                    onChange={(e) => {
                        setAmountText(e.target.value);
                    }}
                    onBlur={(e) => {
                        const amount = roundAmount(e.target.value);

                        setAmountText(Math.abs(roundAmount(e.target.value)).toFixed(2));

                        setFormData({
                            ...formData,
                            amount: amount
                        });
                    }}
                    onFocus={(e) => e.target.select()}
                    className="px-1 flex-grow border-b-2"
                />
            </div>

            {/* Date/Time */}
            <div className="space-x-8">
                <input
                    type="date"
                    value={formData.recordDate}
                    required
                    onChange={(e) => setFormData({ ...formData, recordDate: e.target.value })}
                    className={`m-1  ${formData.recordDate ? '' : 'text-gray-400'}`}
                />

                <input
                    type="time"
                    value={formData.recordTime}
                    required
                    onChange={(e) => setFormData({ ...formData, recordTime: e.target.value })}
                    className={`m-1  ${formData.recordTime ? '' : 'text-gray-400'}`}
                />
            </div>

            {/* Category Picker */}
            <div>
                {formData.type !== 'TRANSFER' && (
                    <select
                        name="category"
                        value={formData.categoryId}
                        required
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        className={`m-1 ${formData.categoryId ? '' : 'text-gray-400'}`}>
                        <option value="" disabled hidden>
                            Choose category...
                        </option>
                        {categories?.map((category: any) => (
                            <option value={category.id} key={category.id} className="text-black">
                                {category.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <div className="flex flex-row items-center">
                {/* Account From */}
                <select
                    name="account"
                    value={formData.accountIdFrom}
                    required
                    onChange={(e) => setFormData({ ...formData, accountIdFrom: e.target.value })}
                    className={`m-1 ${formData.accountIdFrom ? '' : 'text-gray-400'}`}>
                    <option value="" disabled hidden>
                        {formData.type === 'TRANSFER' ? 'From account...' : 'Choose account...'}
                    </option>
                    {accounts?.map((account: any) => (
                        <option value={account.id} key={account.id} className="text-black">
                            {account.name}
                        </option>
                    ))}
                </select>

                {formData.type === 'TRANSFER' && (
                    <div className="mx-4">
                        <BsArrowRight size={24} />
                    </div>
                )}
                {
                    /* Account To */
                    formData.type === 'TRANSFER' && (
                        <select
                            name="account"
                            value={formData.accountIdTo ?? ''}
                            required
                            onChange={(e) =>
                                setFormData({ ...formData, accountIdTo: e.target.value })
                            }
                            className={`m-1 ${formData.accountIdTo ? '' : 'text-gray-400'}`}>
                            <option value="" disabled hidden>
                                To account...
                            </option>
                            {accounts?.map((account: any) => (
                                <option value={account.id} key={account.id} className="text-black">
                                    {account.name}
                                </option>
                            ))}
                        </select>
                    )
                }
            </div>

            {/* Notes */}
            <input
                placeholder="Notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="m-1 px-1 border-b-2"
            />

            <button type="submit" className=" mx-1 px-2 py-1 text-white bg-blue-500 rounded-md">
                {buttonLabel}
            </button>
        </form>
    );
}

export default TransactionForm;
