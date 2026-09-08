import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-[72px]">{children}</main>
      </body>
    </html>
  );
}