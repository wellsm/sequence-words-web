import { ArrowBigLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Word } from "@/schemas/word";

type WordsCardProps = {
  words: Word[];
  title?: string;
  name?: string;
  className?: string;
  indexOfWordToGuess?: number;
};

export function WordsCard({
  words,
  title,
  name,
  className,
  indexOfWordToGuess,
}: WordsCardProps) {
  return (
    <Card className={cn("p-0 px-5 py-5", className)}>
      {title && (
        <CardHeader className="p-0">
          <CardTitle>
            {title} {name && `(${name})`}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <div className="flex flex-col space-y-1">
          {words.map((word) => (
            <div
              className="flex text-left font-mono text-2xl tracking-[.75rem]"
              key={`my-word-${word.id}`}
            >
              {word.value.split("").map((letter, j) => (
                <div
                  className={cn(
                    "flex items-center justify-center",
                    j < word.revealed ? "font-bold" : "text-muted-foreground"
                  )}
                  key={`my-word-${word}-${j}-${letter}`}
                >
                  {letter}
                  {j === word.value.length - 1 &&
                    word.index === indexOfWordToGuess && (
                      <ArrowBigLeft className="mb-1 ml-1 h-4 w-4" />
                    )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
