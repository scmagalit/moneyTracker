import TransactionList from './TransactionList';

export const revalidate = 0;

async function Transactions() {
    return (
        <div className="p-1">
            <p>Transactions</p>
            {/* @ts-ignore */}
            <TransactionList />
        </div>
    );
}

export default Transactions;
