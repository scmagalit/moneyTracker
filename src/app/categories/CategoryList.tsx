import OptionsBar from '@/components/OptionsBar';
import { getCategoryList } from '@/utils/categoryCRUD';
import Link from 'next/link';

async function CategoryList() {
    const res = await getCategoryList();
    const categories = res.data ?? [];

    return (
        <div className="flex flex-col space-y-1">
            {categories?.map((categ: any) => (
                <div key={categ.id} className="flex flex-row p-1 items-center hover:bg-slate-100">
                    <Link
                        href={`/categories/${categ.id}`}
                        className="flex flex-row flex-grow justify-between">
                        <p className="mx-1">{categ.name}</p>
                    </Link>

                    <OptionsBar id={categ.id} page="categories" />
                </div>
            ))}
        </div>
    );
}

export default CategoryList;
