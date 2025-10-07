import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";

const COPIED_TIMEOUT = 1000;

export function CopyToClipboard({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), COPIED_TIMEOUT * 2);
    }
  }, [isCopied]);

  const handleCopy = () => {
    copyToClipboard(text);
    setIsCopied(true);
  };

  return (
    <Button
      className="w-full transition-all duration-300 ease-in-out sm:w-60"
      onClick={handleCopy}
      size="lg"
      variant="outline"
    >
      {isCopied ? (
        <Check className="mr-2 h-4 w-4 transition-all duration-300 ease-in-out" />
      ) : (
        <Copy className="mr-2 h-4 w-4 transition-all duration-300 ease-in-out" />
      )}
      {isCopied ? "Copied" : "Copy to clipboard"}
    </Button>
  );
}
