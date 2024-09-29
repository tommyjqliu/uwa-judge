/*
"use client"; // 确保这是一个客户端组件

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ClarificationPage = () => {
  const { assignmentID } = useParams(); // 使用 useParams 获取动态参数
  const [clarificationData, setClarificationData] = useState<any>(null); // 允许 clarificationData 为 null 或任意类型
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // error 也可以是 null

  useEffect(() => {
    const fetchClarification = async () => {
      try {
        const response = await fetch(`/api/assignments/${assignmentID}/clarification`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setClarificationData(data);
      } catch (err) {
        const errorMessage = (err as Error).message || 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (assignmentID) {
      fetchClarification();
    }
  }, [assignmentID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>44
      <h1>Clarification for Assignment: {assignmentID}</h1>
      <pre>{JSON.stringify(clarificationData, null, 2)}</pre>
    </div>
  );
};

export default ClarificationPage;
*/
"use client"; // 确保这是一个客户端组件

import React from 'react';

const ClarificationPage = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default ClarificationPage;

