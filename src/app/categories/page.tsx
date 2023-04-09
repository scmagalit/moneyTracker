import CategoryList from './CategoryList';

export const revalidate = 0;

async function Categories() {
    return (
        <div className="p-1">
            <p>Categories</p>
            {/* @ts-ignore */}
            <CategoryList />
        </div>
    );
}

export default Categories;
