"use client"; // 将此文件标记为客户端组件

import React, { useEffect, useState } from 'react';
import { ClarificationList } from "./list1"; // 导入 ClarificationList 组件
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // 导入 Pagination 组件
import Link from "next/link";

// 定义澄清的类型
type Clarification = {
  id: number;
  text: string;
  assignmentId: number;
};

export default function Page({
  searchParams,
  fetchData = true,  // 新增 fetchData 参数，决定是否使用 API 调用作为默认数据来源
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
  fetchData?: boolean;  // 新增的可选参数，默认为 true
}) {
  const [clarifications, setClarifications] = useState<Clarification[]>([]);
  const clarificationsPerPage = 10;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const [totalPage, setTotalPage] = useState(0);

  // 定义一个函数来获取数据
  const fetchClarifications = async () => {
    const response = await fetch('/api/clarificationall'); // 调用 API 路由
    if (!response.ok) {
      console.error('Failed to fetch clarifications');
      return;
    }
    const allClarifications = await response.json();
    console.log("Total clarifications:", allClarifications.length);
    
    // 更新总页数和当前页的澄清数据
    setTotalPage(Math.ceil(allClarifications.length / clarificationsPerPage));
    
    const startIndex = (page - 1) * clarificationsPerPage;
    const endIndex = startIndex + clarificationsPerPage;
    setClarifications(allClarifications.slice(startIndex, endIndex));
  };

  useEffect(() => {
    // 如果 fetchData 为 true，则调用 API 获取数据
    if (fetchData) {
      fetchClarifications(); 
    }
  }, [fetchData]); // 空依赖数组，确保只在组件挂载时或 fetchData 改变时运行

  // 处理 save 或 delete 后的重新获取数据
  const handleDataUpdate = () => {
    fetchClarifications();  // 再次调用 API 获取最新数据
  };

  return (
    <main className="p-8">
      <div className="flex justify-between">
        <h2 className="mb-4">Clarifications</h2>
        <Link href="/clarifications/create">Create Clarification</Link>
      </div>
      {/* 将 handleDataUpdate 函数传递给 ClarificationList */}
      <ClarificationList clarifications={clarifications} onDataUpdate={handleDataUpdate} />
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
            <PaginationNext href={page < totalPage ? `?page=${page + 1}` : "#"} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
