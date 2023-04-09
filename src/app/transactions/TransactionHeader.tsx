import Link from 'next/link';

function TransactionHeader() {
    return (
        <div>
            <Link
                href="/transactions/add"
                replace
                className=" mx-1 px-2 py-1 text-white bg-blue-500 rounded-md">
                Add Transaction
            </Link>
        </div>
    );
}

export default TransactionHeader;
