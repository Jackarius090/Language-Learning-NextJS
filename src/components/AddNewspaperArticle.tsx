import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";
import getNewsArticle from "@/app/actions/getNewsArticle";
const text = await getNewsArticle();

export default async function AddNewspaperArticle({
  setTextAreaText,
}: {
  setTextAreaText: Dispatch<SetStateAction<string>>;
}) {
  function addText() {
    setTextAreaText(text);
  }

  return (
    <Button onClick={addText} variant="outline">
      Add Danish newspaper article
    </Button>
  );
}
