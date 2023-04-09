import './globals.css';
import Header from './Header';

export const metadata = {
    title: 'Money Tracker',
    description: 'Track your expenses and wallets!'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}
