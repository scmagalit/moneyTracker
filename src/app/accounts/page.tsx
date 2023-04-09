import AccountList from './AccountList';

export const revalidate = 0;

async function Accounts() {
    return (
        <div className="p-1">
            <p>Accounts</p>
            {/* @ts-ignore */}
            <AccountList />
        </div>
    );
}

export default Accounts;
