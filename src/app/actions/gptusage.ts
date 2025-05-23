"use server";

export async function gptusage(): Promise<{
  data: Array<{
    results: Array<{
      input_tokens: number;
      output_tokens: number;
    }>;
  }>;
}> {
  try {
    // Get UNIX timestamps for start of today and current time
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startUnix = Math.floor(startOfToday.getTime() / 1000);
    const nowUnix = Math.floor(now.getTime() / 1000);

    // Build the URL with required query parameters
    const url = new URL(
      "https://api.openai.com/v1/organization/usage/completions"
    );
    url.searchParams.append("start_time", startUnix.toString());
    url.searchParams.append("end_time", nowUnix.toString());
    url.searchParams.append("bucket_width", "1h");
    url.searchParams.append("limit", "24");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_USAGEKEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("OpenAI usage API error:", error);
    return { data: [] };
  }
}
