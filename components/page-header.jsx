import Link from "next/link";

import useServerDarkMode from "../hooks/use-server-dark-mode";
import DarkModeToggle from "./dark-mode-toggle";

export default function PageHeader({ className }) {
  const theme = useServerDarkMode();
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link
        href="/dashboard"
        classNAme="text-xl hover:underline underline-offset-8 decoration-2"
      >
        Finance App
      </Link>
      <div className="flex item-center space-x-4">
        <DarkModeToggle defaultMode={theme} />
        <div className="">User Dropdown</div>
      </div>
    </header>
  );
}
