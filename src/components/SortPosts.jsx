"use client"

import { useRouter, useSearchParams } from "next/navigation"

export function SortDropdown(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get("sort") || "top";

    function handleChange(e){
        const params = new URLSearchParams(searchParams);
        params.set("sort", e.target.value);
        // reset to page 1 when sorting changes
        params.set("page", "1");
        router.push(`?${params.toString()}`)
    }

    return(
        <select value={currentSort} onChange={handleChange}>
            <option value="top">Most Upvotes</option>
            <option value="recent">Newest</option>
        </select>
    )
}
