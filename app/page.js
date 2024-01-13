import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  return (
    <main className="flex items-center flex-col gap-3 mt-3">
      <Link href="/quiz" style={{ display: "block", width: "fit-content" }}>
        <button
          type="button"
          className="outline-none border-none duration-200 bg-gray-100 flex items-center gap-1 hover:opacity-80 text-gray-800 text-base p-2 rounded-lg font-medium cursor-pointer"
        >
          <ArrowRight size={21} weight="fill" />
          شروع آزمون
        </button>
      </Link>
      <Link href="/about" className="text-gray-100 underline">
        درباره من
      </Link>
    </main>
  );
}
