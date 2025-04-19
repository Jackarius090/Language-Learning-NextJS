"use client";
import { useState } from "react";
import { Button } from "./ui/button";
export default function GPTSpending() {
  const [tokens, setTokens] = useState(0);
  const [cost, setCost] = useState(0);

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
      setTokens(
        countMoney(countInputTokens(data), countOutputTokens(data)).totalTokens
      );
      setCost(
        countMoney(countInputTokens(data), countOutputTokens(data)).totalCost
      );

      return data;
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Unknown error");
      return "Error fetching response";
    }
  };

  function countInputTokens(data: {
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

  function countOutputTokens(data: {
    data: Array<{
      results: Array<{
        input_tokens: number;
        output_tokens: number;
      }>;
    }>;
  }) {
    let outputTokensTotal = 0;
    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].results[0]?.output_tokens) {
        outputTokensTotal += data.data[i].results[0]?.output_tokens;
      }
    }
    console.log(outputTokensTotal);
    return outputTokensTotal;
  }

  function countMoney(inputTokens: number, outputTokens: number) {
    const inputTokenDollars = inputTokens / 1000000 / 0.4;
    const outputTokenDollars = outputTokens / 1000000 / 1.6;
    const totalCost = inputTokenDollars + outputTokenDollars;
    const totalTokens = inputTokens + outputTokens;
    return { totalTokens, totalCost };
  }

  return (
    <div>
      <div>ChatGPT tokens used today: {tokens}</div>
      <div>Total cost: ${cost}</div>
      <Button onClick={handleClick} variant={"outline"}>
        get spending
      </Button>
    </div>
  );
}
