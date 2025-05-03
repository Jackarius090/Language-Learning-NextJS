import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LevelSelect({
  readingLevel,
  setreadingLevel,
}: {
  readingLevel: string;
  setreadingLevel: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Select onValueChange={setreadingLevel}>
      <SelectTrigger className="w-[150px] inline-flex m-3">
        <SelectValue placeholder={`Reading level ${readingLevel}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="A1">A1</SelectItem>
        <SelectItem value="A2">A2</SelectItem>
        <SelectItem value="B1">B1</SelectItem>
        <SelectItem value="B2">B2</SelectItem>
        <SelectItem value="C1">C1</SelectItem>
        <SelectItem value="C2">C2</SelectItem>
      </SelectContent>
    </Select>
  );
}
