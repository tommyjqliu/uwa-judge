"use client";

import useUpdateQuery from "@/lib/hooks/use-update-query";
// import { Pagination as MuiPagination, PaginationItem } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface PaginationProps {
  page?: number;
  perPage?: number;
  totalPage?: number;
  className?: string;
}
// Fix later
export default function Pagination({
  page = 1,
  perPage,
  totalPage,
  className,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const update = useUpdateQuery();
  // return (
  //   <MuiPagination
  //     className={className}
  //     count={totalPage}
  //     page={searchParams.get("page") ? +searchParams.get("page")! : 1}
  //     onChange={(e, page) => {
  //       update("page", page);
  //     }}
  //   />
  // );
}
