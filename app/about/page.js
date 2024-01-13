import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h2>درباره من</h2>
      <Link href="/quiz" style={{ textDecoration: "underline" }}>
        آزمون
      </Link>
    </div>
  );
}
