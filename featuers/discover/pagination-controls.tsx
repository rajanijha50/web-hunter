"use client";
import { LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight } from "react-icons/lu";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (end === totalPages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12 pb-8">
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-xl transition-all hover:bg-primary/80 disabled:opacity-50"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <LuChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-xl transition-all hover:bg-primary/80 disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <LuChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-1 mx-2">
        {getPageNumbers().map((num) => (
          <Button
            key={num}
            variant={num === currentPage ? "default" : "outline"}
            className={`h-9 w-9 rounded-xl font-bold text-sm transition-all duration-300 ${
              num === currentPage 
                ? "bg-primary text-white shadow-lg scale-110" 
                : "hover:bg-primary/80 text-muted-foreground"
            }`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-xl transition-all hover:bg-primary/80 disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <LuChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-xl transition-all hover:bg-primary/80 disabled:opacity-30"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <LuChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
