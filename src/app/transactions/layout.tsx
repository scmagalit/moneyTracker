import TransactionHeader from './TransactionHeader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex-col divide-y-2">
            <div className="py-2">
                {/* @ts-ignore */}
                <TransactionHeader />
            </div>
            <div className="">
                <div>{children}</div>
            </div>
        </main>
    );
}
