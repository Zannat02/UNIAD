import Navbar from "@/components/layout/Navbar";
import "./globals.css";


export const metadata = {
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#FAF9F4] text-[#101820]">
        <Navbar />
        <main className="pt-[72px]">{children}</main>
      </body>
    </html>
  );
}