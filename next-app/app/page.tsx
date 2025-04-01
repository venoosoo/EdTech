import Image from "next/image";
import Link from "next/link";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Dashboard />
    </main>
  );
}
