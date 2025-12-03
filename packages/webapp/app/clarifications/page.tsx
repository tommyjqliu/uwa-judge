"use client"; // Marks this file as a client-side component

import React, { useEffect, useState } from "react";
import { ClarificationList } from "./clarification-list"; // Import the ClarificationList component
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // Import Pagination components
import Link from "next/link";

// Define the Clarification type
type Clarification = {
  id: number;
  text: string;
  assignmentId: number;
};

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const fetchData = true; // Add fetchData parameter to determine if API should be used as default data source
  const [clarifications, setClarifications] = useState<Clarification[]>([]);
  const clarificationsPerPage = 10;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const [totalPage, setTotalPage] = useState(0);

  // Function to fetch clarifications data
  const fetchClarifications = async () => {
    const response = await fetch("/api/clarificationall"); // Call the API route
    if (!response.ok) {
      console.error("Failed to fetch clarifications");
      return;
    }
    const allClarifications = await response.json();
    console.log("Total clarifications:", allClarifications.length);

    // Update total page count and set the clarifications for the current page
    setTotalPage(Math.ceil(allClarifications.length / clarificationsPerPage));

    const startIndex = (page - 1) * clarificationsPerPage;
    const endIndex = startIndex + clarificationsPerPage;
    setClarifications(allClarifications.slice(startIndex, endIndex));
  };

  useEffect(() => {
    // Fetch data if fetchData is true
    if (fetchData) {
      fetchClarifications();
    }
  }, [fetchData]); // Empty dependency array ensures it only runs on mount or when fetchData changes

  // Handle data updates after save or delete operations
  const handleDataUpdate = () => {
    fetchClarifications(); // Re-fetch data after an update
  };

  return (
    <main className="p-8">
      <div className="flex justify-between">
        <h2 className="mb-4">Clarifications</h2>
        <Link href="/clarifications/create">Create Clarification</Link>
      </div>
      {/* Pass handleDataUpdate to ClarificationList */}
      <ClarificationList
        clarifications={clarifications}
        onDataUpdate={handleDataUpdate}
      />
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={page > 1 ? `?page=${page - 1}` : "#"} />
          </PaginationItem>
          {Array.from({ length: totalPage }, (_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink href={`?page=${index + 1}`}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPage > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href={page < totalPage ? `?page=${page + 1}` : "#"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
