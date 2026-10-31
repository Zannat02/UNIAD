import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import Footer from "@/components/layout/Footer";


export const viewport = { colorScheme: "light" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#FAF9F4] text-[#101820] suppressHydrationWarning">
        <Navbar />
        <main className="pt-[72px]">{children}</main>
         <Footer />
      </body>
    </html>
  );
}