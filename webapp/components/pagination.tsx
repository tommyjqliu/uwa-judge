import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

export interface PaginationProps {
  totalCount: number;
  page: number;
  perPage: number;
  className?: string;
}

export default function Pagination({
  page,
  perPage,
  totalCount,
  className,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / perPage);
  const maxVisiblePages = 7;

  const getPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSide = Math.floor(maxVisiblePages / 2);
    const rightSide = maxVisiblePages - leftSide - 1;

    if (page <= leftSide) {
      return [
        ...Array.from({ length: maxVisiblePages - 1 }, (_, i) => i + 1),
        totalPages,
      ];
    }

    if (page > totalPages - rightSide) {
      return [
        1,
        ...Array.from(
          { length: maxVisiblePages - 1 },
          (_, i) => totalPages - maxVisiblePages + i + 2,
        ),
      ];
    }

    return [
      1,
      ...Array.from(
        { length: maxVisiblePages - 2 },
        (_, i) => page - leftSide + i + 1,
      ),
      totalPages,
    ];
  };

  const pageNumbers = getPageNumbers();

  return (
    <PaginationUI className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={page > 1 ? `?page=${page - 1}` : "#"}
            aria-disabled={page <= 1}
          />
        </PaginationItem>
        {pageNumbers.map((pageNumber, index) => (
          <React.Fragment key={pageNumber}>
            {index > 0 && pageNumber - pageNumbers[index - 1] > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                href={`?page=${pageNumber}`}
                isActive={pageNumber === page}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          </React.Fragment>
        ))}
        <PaginationItem>
          <PaginationNext
            href={page < totalPages ? `?page=${page + 1}` : "#"}
            aria-disabled={page >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationUI>
  );
}
