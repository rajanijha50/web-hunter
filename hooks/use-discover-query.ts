"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

export function useDiscoverQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "All AI";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const setQuery = useCallback((params: { category?: string; page?: number }) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (params.category !== undefined) {
      if (params.category === "All AI") {
        current.delete("category");
      } else {
        current.set("category", params.category);
      }
      // Reset page to 1 when category changes
      current.delete("page");
    }

    if (params.page !== undefined) {
      if (params.page === 1) {
        current.delete("page");
      } else {
        current.set("page", params.page.toString());
      }
    }

    const query = current.toString();
    const url = `${pathname}${query ? `?${query}` : ""}`;
    
    router.push(url, { scroll: false });
  }, [searchParams, pathname, router]);

  return {
    category,
    page,
    setQuery
  };
}
