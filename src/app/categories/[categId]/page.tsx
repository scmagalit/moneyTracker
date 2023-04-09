import { getCategoryDetails } from '@/utils/categoryCRUD';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BiArrowBack } from 'react-icons/bi';

type PageProps = {
    params: {
        categId: string;
    };
};

async function AccountPage({ params: { categId } }: PageProps) {
    const res = await getCategoryDetails(categId);
    const categ = res.data ? res.data[0] : null;

    if (!categ) return notFound();

    return (
        <div className="p-1 space-y-3">
            <Link
                href="/categories"
                className="mx-1 px-2 py-1 text-white bg-blue-500 rounded-md inline-flex">
                <BiArrowBack />
            </Link>

            <div className="space-y-1">
                <p className="text-sm text-gray-500 py-1">Category Name</p>
                <p className="text-xl font-bold px-1">{categ.name}</p>
            </div>
        </div>
    );
}

export default AccountPage;
