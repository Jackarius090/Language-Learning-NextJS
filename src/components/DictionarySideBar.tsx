import { Dictionary } from "./Dictionary";
import getData from "@/db/dbActions";

export async function DictionarySideBar() {
  const words = getData();

  return <Dictionary words={words} />;
}
