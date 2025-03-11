import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";

type Props = { className?: string; fullScreen?: boolean };

export function LoadingSpinner({ fullScreen }: Props) {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (!showSpinner) {
    return null;
  }

  return (
    <div
      className={cn(
        "",
        fullScreen && "flex h-full w-full items-center justify-center"
      )}
    >
      <DotLoader color={"teal"} />
    </div>
  );
}
