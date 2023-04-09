'use client';

import Link from 'next/link';
import CategoryForm from '@/app/categories/CategoryForm';
import { BiArrowBack } from 'react-icons/bi';
import { addCategory } from '@/utils/categoryCRUD';

function AddCategoryPage() {
    const add = async (category: categoryFormData) => {
        addCategory(category);
    };

    return (
        <div className="p-1">
            <Link
                href="/categories"
                className="mx-1 px-2 py-1 text-white bg-blue-500 rounded-md inline-flex">
                <BiArrowBack />
            </Link>

            <h3>Add a new category</h3>

            <CategoryForm onSubmit={add} buttonLabel="Create Category" />
        </div>
    );
}

export default AddCategoryPage;
