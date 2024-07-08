"use client";
import { LogOut } from "lucide-react";

import { signOut } from "@/lib/actions";

import SubmitButton from "./submit-button";

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <SubmitButton variant="ghost" size="sm">
        <LogOut className="w-6 h-6" />
      </SubmitButton>
    </form>
  );
}
