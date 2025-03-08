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
          prompt: `Return three example sentences using this word: ${highlightedText}. The sentences should be in the same language as the word. Format the response as a JSON object with a 'sentences' key, containing an array of strings.`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      const object = JSON.parse(data.choices[0].message.content);
      // Assuming the response is { sentences: ["sentence1", "sentence2", "sentence3"] }
      setResponse(object.sentences || "No sentences found.");
      console.log(response);
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
      <pre className="mt-4 whitespace-pre-wrap">{response[0]}</pre>
      <pre className="mt-4 whitespace-pre-wrap">{response[1]}</pre>
      <pre className="mt-4 whitespace-pre-wrap">{response[2]}</pre>
    </section>
  );
}
