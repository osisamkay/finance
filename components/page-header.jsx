import Link from "next/link";

export default function PageHeader({ className }) {
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link
        href="/dashboard"
        classNAme="text-xl hover:underline underline-offset-8 decoration-2"
      >
        Finance App
      </Link>
      <div className="flex item-center space-x-4">
        <div className="">Mode Toggle</div>
        <div className="">User Dropdown</div>
      </div>
    </header>
  );
}
