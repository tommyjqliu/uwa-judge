// "use client"; // Ensure this is a client component

import React from 'react';

import { ClarificationList } from "@/app/clarifications/clarificationformlist";  // Import the ClarificationList component
import Pagination from "@/lib/components/pagination";
import { uwajudgeDB } from "@/lib/database-client";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // Retrieve all clarifications
  const allClarifications = await uwajudgeDB.clarification.findMany();  // Get clarification data from the database
  console.log("Total clarifications:", allClarifications.length);

  // Set the number of clarifications displayed per page
  const clarificationsPerPage = 10;

  // Parse the page number, defaulting to page 1
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  // Calculate the total number of pages
  const totalPage = Math.ceil(allClarifications.length / clarificationsPerPage);

  // Determine the range of clarifications for the current page based on the page number and per page count
  const startIndex = (page - 1) * clarificationsPerPage;
  const endIndex = startIndex + clarificationsPerPage;
  const clarifications = allClarifications.slice(startIndex, endIndex);

  console.log("Current page:", page);
  console.log("Total pages:", totalPage);

  // Render the clarification list and pagination component
  return (
    <main className="p-8">
      <div className="flex justify-between">
        <h2 className="mb-4">Clarifications</h2>
        <Link href="/clarifications/create">Create Clarification</Link>
      </div>
      <ClarificationList clarifications={clarifications} />  {/* Render the Clarification list */}
      <Pagination totalPage={totalPage} className="mt-4"/>
    </main>
  );
}
