import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import styles from "@/app/page.module.css";

export default function Home() {
  return (
    <main style={{ display: "flex", justifyContent: "center" }}>
      <Link href="/quiz" style={{ display: "block", width: "fit-content" }}>
        <button className={styles.start_button} type="button">
          <ArrowRight size={21} weight="fill" />
          شروع آزمون
        </button>
      </Link>
    </main>
  );
}
