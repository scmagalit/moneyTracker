'use client';

import { deleteAccount } from '@/utils/accountCRUD';
import { deleteCategory } from '@/utils/categoryCRUD';
import { deleteTransaction } from '@/utils/transactionCRUD';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BiEdit, BiTrash } from 'react-icons/bi';

type props = {
    id: string;
    page: string;
};

function OptionsBar({ id, page }: props) {
    const router = useRouter();
    const updateLink = `/${page}/${id}/update`;
    let deleteFunction = async (id: string) => {};

    switch (page) {
        case 'transactions':
            deleteFunction = async (id: string) => {
                deleteTransaction(id);
            };
            break;
        case 'accounts':
            deleteFunction = async (id: string) => {
                deleteAccount(id);
            };
            break;
        case 'categories':
            deleteFunction = async (id: string) => {
                deleteCategory(id);
            };
            break;
        default:
        // * Should not go here
    }

    return (
        <div className="flex flex-row space-x-1">
            <Link
                href={updateLink}
                className="m-1 p-2 text-white bg-slate-400 hover:bg-orange-500 rounded-md">
                <BiEdit />
            </Link>

            <button
                className="m-1 p-2 text-white bg-slate-400 hover:bg-red-600 rounded-md"
                onClick={() => {
                    deleteFunction(id);
                    router.refresh();
                }}>
                <BiTrash />
            </button>
        </div>
    );
}

export default OptionsBar;
