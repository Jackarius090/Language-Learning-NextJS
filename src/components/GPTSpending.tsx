"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
export default function GPTSpending() {
  const [tokens, setTokens] = useState(0);
  const [cost, setCost] = useState("");
  const [spendingLoading, setSpendingLoading] = useState(false);

  const handleClick = async () => {
    setSpendingLoading(true);
    try {
      const res = await fetch("/api/gptusage", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        setSpendingLoading(false);
        throw new Error("Failed to fetch response");
      }
      const data = await res.json();
      setTokens(
        countMoney(countInputTokens(data), countOutputTokens(data)).totalTokens
      );
      setCost(
        countMoney(countInputTokens(data), countOutputTokens(data))
          .roundedTotalCost
      );
      setSpendingLoading(false);
      return data;
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Unknown error");
      setSpendingLoading(false);
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
    return outputTokensTotal;
  }

  function countMoney(inputTokens: number, outputTokens: number) {
    const inputTokenDollars = inputTokens / 1000000 / 0.4;
    const outputTokenDollars = outputTokens / 1000000 / 1.6;
    const TotalCost = inputTokenDollars + outputTokenDollars;
    const roundedTotalCost = TotalCost.toFixed(4);
    const totalTokens = inputTokens + outputTokens;
    return { totalTokens, roundedTotalCost };
  }

  return (
    <div>
      <div>ChatGPT tokens used today: {tokens}</div>
      <div>Total cost: ${cost}</div>
      <Button onClick={handleClick} variant={"outline"}>
        Get spending
        {spendingLoading && <LoaderCircle className="size-5 animate-spin" />}
      </Button>
    </div>
  );
}
