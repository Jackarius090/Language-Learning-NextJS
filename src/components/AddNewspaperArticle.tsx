import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";

export default function AddNewspaperArticle({
  setTextAreaText,
  text,
}: {
  text: string;
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
