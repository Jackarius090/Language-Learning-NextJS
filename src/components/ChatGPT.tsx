"use client";
import { useState, FormEvent } from "react";

export default function Home({ highlightedText }: { highlightedText: string }) {
  const [response, setResponse] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Return three example sentences using this word: ${highlightedText}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      setResponse(data.choices?.[0]?.message?.content || "No response");
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Unknown error");
      setResponse("Error fetching response");
    }
  };

  return (
    <section className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Get example sentences
        </button>
      </form>
      <p className="mt-4">{response}</p>
    </section>
  );
}
