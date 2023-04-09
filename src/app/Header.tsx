import Link from 'next/link';

function Header() {
    return (
        <header className="p-5 bg-blue-500">
            <Link href="/" className=" mx-1 px-2 py-1 bg-white text-blue-500 rounded-md">
                Home
            </Link>
            <Link href="/transactions" className="mx-1 px-2 py-1 bg-white text-blue-500 rounded-md">
                Transactions
            </Link>
            <Link href="/accounts" className="mx-1 px-2 py-1 bg-white text-blue-500 rounded-md">
                Accounts
            </Link>
            <Link href="/categories" className="mx-1 px-2 py-1 bg-white text-blue-500 rounded-md">
                Categories
            </Link>
        </header>
    );
}

export default Header;
