import getData from "@/db/dbActions";

export default async function WordList() {
  const words = await getData();
  console.log("Words from DB:", words);
  return (
    <section>
      <h1>Word List</h1>
      <p>WORDS...</p>
      <p>source_word: {words[0].source_word}</p>
      <p>translated_word: {words[0].translated_word}</p>
    </section>
  );
}
