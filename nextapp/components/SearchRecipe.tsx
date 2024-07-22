'use client'
import React from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

const SearchRecipe = () => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [search, setSearch] = React.useState(params.get("search") ?? "");
  const debouncedSearch = useDebounce(search,700);
  React.useEffect(() => {
    if (debouncedSearch !== "" && debouncedSearch.replaceAll(" ","").length >= 0) {
      router.push(`/recipe?search=${debouncedSearch}`);
    } else {
      if(pathname === "/recipe")
      router.push(`/recipe`);
    }
  }, [debouncedSearch, router.push]);
  return <Input placeholder="Search Recipe" className="w-full" onChange={(e)=>setSearch(e.target.value)} />;
};

export default SearchRecipe;
