import { cn } from "@heroui/theme";

export default function findHighlights(
  text: string,
  query: string,
  className?: string,
) {
  return text.split(new RegExp(`(${query})`, "gi")).map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span
        key={i}
        className={cn("!", className)}
        style={{ backgroundColor: "green" }}
      >
        {part}
      </span>
    ) : (
      part
    ),
  );
}
