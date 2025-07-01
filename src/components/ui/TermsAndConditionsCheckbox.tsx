"use client";

import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox"; 
import { Label } from "./label"; 
import LinkAPP from "../util/link";

interface TermsAndConditionsCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  error?: string;
}

export function TermsAndConditionsCheckbox({
  checked,
  onCheckedChange,
  id = "terms-checkbox",
  error,
}: TermsAndConditionsCheckboxProps) {
  return (
    <div className="items-top flex space-x-2 my-4">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={error ? "border-red-500" : ""}
      />
      <div className="grid gap-1.5 leading-none">
        <Label
          htmlFor={id}
          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
            error ? "text-red-500" : ""
          }`}
        >
          Saya setuju dengan{" "}
          <LinkAPP href="/legal/terms" target="_blank" className="font-semibold text-button hover:underline">
            Syarat & Ketentuan
          </LinkAPP>{" "}
          dan{" "}
          <LinkAPP href="/legal/privacy-policy" target="_blank" className="font-semibold text-button hover:underline">
            Kebijakan Privasi
          </LinkAPP>
          .
        </Label>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        <p className="text-xs text-muted-foreground">
          Dengan mencentang kotak ini, Anda mengakui bahwa data Anda akan digunakan untuk penelitian dan analisis internal sebagaimana diuraikan dalam kebijakan kami.
        </p>
      </div>
    </div>
  );
} 