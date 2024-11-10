import '../styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '都道府県別人口推移グラフ',
  description: 'RESAS APIを使用した都道府県別人口推移の可視化',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-white shadow mb-8">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-xl font-bold">都道府県別人口推移グラフ</h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
