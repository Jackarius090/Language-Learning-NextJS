"use client";
import { useState } from "react";
export default function GPTSpending() {
  const [tokens, setTokens] = useState(0);

  const handleClick = async () => {
    try {
      const res = await fetch("/api/gptusage", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }
      const data = await res.json();
      console.log(data);
      setTokens(countTokens(data));

      return data;
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Unknown error");
      return "Error fetching response";
    }
  };

  function countTokens(data: {
    data: Array<{
      results: Array<{
        input_tokens: number;
        output_tokens: number;
      }>;
    }>;
  }) {
    let inputTokensTotal = 0;
    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].results[0]?.input_tokens) {
        inputTokensTotal += data.data[i].results[0]?.input_tokens;
      }
    }
    console.log(inputTokensTotal);
    return inputTokensTotal;
  }

  return (
    <div>
      <span>ChatGPT tokens used: {tokens}</span>
      <button onClick={handleClick}>get spending</button>
    </div>
  );
}
