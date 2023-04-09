import Link from 'next/link';

function AccountHeader() {
    return (
        <div>
            <Link
                href="/accounts/add"
                replace
                className=" mx-1 px-2 py-1 text-white bg-blue-500 rounded-md">
                Add Account
            </Link>
        </div>
    );
}

export default AccountHeader;
