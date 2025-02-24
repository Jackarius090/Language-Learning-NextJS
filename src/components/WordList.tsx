import { getAllWords } from "@/db/getWords";
export default async function WordList() {
  const words = await getAllWords();
  console.log("Words from DB:", words);
  return (
    <section>
      <h1>Word List</h1>
      <p>WORDS...</p>
    </section>
  );
}
