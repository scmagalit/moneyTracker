'use client';

import Link from 'next/link';
import CategoryForm from '@/app/categories/CategoryForm';
import { BiArrowBack } from 'react-icons/bi';
import { updateCategory } from '@/utils/categoryCRUD';

type PageProps = {
    params: {
        categId: string;
    };
};

function UpdateCategory({ params: { categId } }: PageProps) {
    const update = async (category: categoryFormData) => {
        updateCategory(category);
    };

    return (
        <div className="p-1">
            <Link
                href="/categories"
                className="mx-1 px-2 py-1 text-white bg-blue-500 rounded-md inline-flex">
                <BiArrowBack />
            </Link>

            <h3>Update this category: {categId}</h3>

            <CategoryForm onSubmit={update} categId={categId} buttonLabel="Update Category" />
        </div>
    );
}

export default UpdateCategory;
