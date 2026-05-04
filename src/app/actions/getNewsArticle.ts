import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function getNewsArticle() {
  //   const session = await getServerSession(authOptions);

  //   if (!session) {
  //     console.log("not authenticated, no session found");
  //     return "Please login to get article";
  //   }

  const response = await fetch(
    "https://api.perigon.io/v1/articles/all?language=en&country=dk&sortBy=date&showReprints=false&showNumResults=true&page=0&size=25&apiKey=4f15****3939",
  );
  const text = await response.json();
  console.log(text);

  return text;
}
