import "./globals.css";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-100">
        <Header />

        <div className="flex">
          <Sidebar />

          <main className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}