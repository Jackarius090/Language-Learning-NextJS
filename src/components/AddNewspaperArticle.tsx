import { Button } from "./ui/button";

export default function AddNewspaperArticle() {
  function addText() {
    const text = "hello";
    return text;
  }
  return (
    <Button onClick={addText} variant="outline">
      Add Danish newspaper article
    </Button>
  );
}
