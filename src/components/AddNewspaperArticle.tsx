import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";
import getNewsArticle from "@/app/actions/getNewsArticle";

export default async function AddNewspaperArticle({
  setTextAreaText,
}: {
  setTextAreaText: Dispatch<SetStateAction<string>>;
}) {
  const text = await getNewsArticle();
  function addText() {
    setTextAreaText(text);
  }

  return (
    <Button onClick={addText} variant="outline">
      Add Danish newspaper article
    </Button>
  );
}
