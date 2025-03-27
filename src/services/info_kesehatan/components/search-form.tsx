"use client";

import { SearchInput } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/app/info-kesehatan/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <SearchInput 
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Cari Info Kesehatan" 
        className="mt-3" 
      />
    </form>
  );
} 