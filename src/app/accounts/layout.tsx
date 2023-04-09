import AccountHeader from './AccountHeader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex-col divide-y-2">
            <div className="py-2">
                {/* @ts-ignore */}
                <AccountHeader />
            </div>
            <div className="">
                <div>{children}</div>
            </div>
        </main>
    );
}
