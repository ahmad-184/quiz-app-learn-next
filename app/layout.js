import { Rubik, Baloo_Bhaijaan_2 } from "next/font/google";
import Logo from "./components/Logo";
import "./globals.css";

// react-loading-skeleto styles
import "react-loading-skeleton/dist/skeleton.css";

const rubic = Rubik({ subsets: ["latin"], display: "swap" });
const baloo = Baloo_Bhaijaan_2({ subsets: ["arabic"], display: "swap" });

export const metadata = {
  title: "Quiz app",
  description: "build a quiz app project to learn nextJs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body className={`${rubic.className} ${baloo.className} container`}>
        <Logo />
        {children}
      </body>
    </html>
  );
}
