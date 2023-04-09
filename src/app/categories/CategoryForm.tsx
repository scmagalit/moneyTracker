'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCategoryDetails, getCategoryList } from '@/utils/categoryCRUD';

type props = {
    onSubmit: (category: categoryFormData) => Promise<void>;
    categId?: string;
    buttonLabel: string;
};

function CategoryForm({ onSubmit, categId, buttonLabel }: props) {
    const router = useRouter();

    const categEmpty: categoryFormData = {
        id: '',
        name: ''
    };

    const [categNames, setCategNames] = useState<string[]>([]);
    const [formDataOrig, setFormDataOrig] = useState<categoryFormData>(categEmpty);
    const [formData, setFormData] = useState<categoryFormData>(categEmpty);

    useEffect(() => {
        const getNames = async () => {
            const res = await getCategoryList();
            const categories = res.data ?? [];
            setCategNames(categories.map((category: categoryDetails) => category.name));
        };

        const getCategOrig = async () => {
            const res = await getCategoryDetails(categId ?? '');
            const category = res.data ? res.data[0] : null;

            if (category) {
                setFormDataOrig({ id: category.id, name: category.name });
                setFormData({ id: category.id, name: category.name });
            }
        };

        getNames();
        getCategOrig();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                if (JSON.stringify(formDataOrig) === JSON.stringify(formData)) return;

                // Makes sure that name submitted is not already exisiting
                if (categNames.includes(formData.name) && formDataOrig.name !== formData.name)
                    return;

                onSubmit(formData);
                router.push('/categories');
                router.refresh();
            }}
            className="flex flex-col">
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                required
                onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                }}
                className="my-1 px-1 border-b-2"
            />

            <button type="submit" className=" mx-1 px-2 py-1 text-white bg-blue-500 rounded-md">
                {buttonLabel}
            </button>
        </form>
    );
}

export default CategoryForm;
