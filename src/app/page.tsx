import TextBox from "@/components/TextBox";

export default function Home() {
  return (
    <section className="mx-auto size-full">
      <h1 className="text-center mt-10 mr-8 text-4xl">Language Learning</h1>
      <div className="flex gap-10 mt-32">
        <TextBox />
      </div>
    </section>
  );
}
