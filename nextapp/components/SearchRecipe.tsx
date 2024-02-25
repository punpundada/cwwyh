'use client'
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

const SearchRecipe = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    if (debouncedSearch !== "") {
      router.push(`/recipe?search=${debouncedSearch}`);
    } else {
      router.push(`/recipe`);
    }
  }, [debouncedSearch, router]);

  return <Input placeholder="Search Recipe" className="w-full" onChange={(e)=>setSearch(e.target.value)} />;
};

export default SearchRecipe;
