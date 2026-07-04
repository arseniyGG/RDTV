import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

export const metadata: Metadata = {
  title: "RDTV",
  description: "Аналог HLTV для Dota 2.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Navbar />
        <div className="container">
          <aside className="sitebarLeft">
            <Sidebar title="Рейтинг команд" href="/ranking">
              <p className="text">soon</p>
            </Sidebar>
            <Sidebar title="Турниры" href="/events">
              <p className="text">soon</p>
            </Sidebar>
          </aside>
          <main className="mainContent">
            {children}
          </main>
          <aside className="sitebarRight">
            <Sidebar title="Матчи дня" href="/matches">
              <p className="text">soon</p>
            </Sidebar>
            <Sidebar title="Трансферы" href="/transfers">
              <div className="text">soon</div>
            </Sidebar>
          </aside>
        </div>
      </body>
    </html>
  );
}