import Link from 'next/link';

function CategoryHeader() {
    return (
        <div>
            <Link
                href="/categories/add"
                replace
                className=" mx-1 px-2 py-1 text-white bg-blue-500 rounded-md">
                Add Category
            </Link>
        </div>
    );
}

export default CategoryHeader;
