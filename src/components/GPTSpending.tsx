"use client";
export default function GPTSpending() {
  let data = [];
  let tokens = 0;

  const handleClick = async () => {
    try {
      const res = await fetch("/api/gptusage", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }
      data = await res.json();
      console.log(data);
      tokens = countTokens();

      return data;
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Unknown error");
      return "Error fetching response";
    }
  };

  function countTokens() {
    let inputTokensTotal = 0;
    for (let i = 0; i < data.length; i++) {
      inputTokensTotal += data[i].results[0]?.input_tokens;
    }
    return inputTokensTotal;
  }

  return (
    <div>
      <span>ChatGPT spending: {tokens}</span>
      <button onClick={handleClick}>get spending</button>
    </div>
  );
}
