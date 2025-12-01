"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/shadcn/pagination";

interface EstatePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BottomPagination({
  currentPage,
  totalPages,
  onPageChange,
}: EstatePaginationProps) {
  const generatePageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    if (currentPage <= 3) {
      pages.push(0, 1, 2, 3, 4, "ellipsis", totalPages - 1);
    } else if (currentPage >= totalPages - 4) {
      pages.push(
        0,
        "ellipsis",
        totalPages - 5,
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1
      );
    } else {
      pages.push(
        0,
        "ellipsis",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "ellipsis",
        totalPages - 1
      );
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 0) onPageChange(currentPage - 1);
            }}
            aria-disabled={currentPage === 0}
            className={
              currentPage === 0
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            href="#"
          />
        </PaginationItem>

        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
                isActive={currentPage === page}
                className="cursor-pointer"
                href="#"
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
            }}
            aria-disabled={currentPage >= totalPages - 1}
            className={
              currentPage >= totalPages - 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            href="#"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
