import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useMemo } from "react";

import { Pagination, PaginationContent } from "../ui/pagination";
import { Badge } from "../ui/badge";

type MyPaginationProps = {
  count?: number;
  limit: number;
  offset: number;
  label: string;
  setOffset: Dispatch<SetStateAction<number>>;
};

export function CustomPagination(props: MyPaginationProps) {
  const { count = 0, limit, offset, setOffset, label } = props;
  const end = useMemo(
    () => Math.min(offset + limit, count),
    [count, limit, offset]
  );

  const isLastPage = useMemo(
    () => limit + offset + 1 > count,
    [count, limit, offset]
  );

  function handleNextPage() {
    setOffset((prev) => prev + limit);
  }

  function handlePreviousPage() {
    setOffset((prev) => prev - limit);
  }

  return (
    <Pagination>
      <PaginationContent>
        <Badge variant="outline" className="h-8 border border-teal-500/80">
          {count ? `${offset + 1}-${end} of ${count}` : `No ${label}`}
        </Badge>
        <Button
          disabled={offset === 0}
          variant="default"
          size="icon"
          onClick={handlePreviousPage}
          className="dark:bg-teal-100/90 shadow-sm cursor-pointer hover:bg-teal-500/40 bg-teal-500/50 text-primary dark:hover:bg-teal-100/80 dark:text-secondary"
        >
          <ChevronLeft />
        </Button>
        {/* <Badge variant="outline">
          Offset: {offset} • Limit: {limit} • Count: {count}
        </Badge> */}

        <Button
          disabled={isLastPage}
          variant="default"
          className="dark:bg-teal-100/90 shadow-sm cursor-pointer hover:bg-teal-500/40 bg-teal-500/50 text-primary dark:hover:bg-teal-100/80 dark:text-secondary"
          size="icon"
          onClick={handleNextPage}
        >
          <ChevronRight />
        </Button>
      </PaginationContent>
    </Pagination>
  );
}
