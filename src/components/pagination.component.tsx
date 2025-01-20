import { PageMetaDto } from "@/api/interfaces/page-meta.dto";
import React, { useRef } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  meta: PageMetaDto;
  onApplyPage: (page: number) => Promise<void>;
}

const PaginationBox: React.FC<PaginationProps> = ({ meta, onApplyPage }) => {
  const pageInputRef = useRef<HTMLInputElement | null>(null);

  const handleOnApplyInputPage = async () => {
    if (pageInputRef.current) {
      if (pageInputRef.current.value.length === 0) {
        return;
      }
      const page = Number(pageInputRef.current.value.replace("-", ""));
      if (page <= meta.pageCount) {
        await handleOnClickPage(Number(pageInputRef.current.value));
      }
      pageInputRef.current.value = "";
    }
  };

  const handleOnClickPage = async (page: number) => {
    if (page === meta.page) {
      return;
    }
    onApplyPage(page);
  };

  return (
    <div className="flex justify-center">
      <Pagination>
        <PaginationContent className="shadow-md p-2 rounded-md">
          {meta.hasPreviousPage ? (
            <PaginationItem>
              <PaginationPrevious
                isActive={meta.hasPreviousPage}
                className="cursor-pointer"
                onClick={() =>
                  meta.hasPreviousPage ? handleOnClickPage(meta.page - 1) : null
                }
              />
            </PaginationItem>
          ) : null}
          {meta.pageCount > 5
            ? Array(5)
                .fill(1)
                .map((_, index) => {
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink
                        className="cursor-pointer"
                        isActive={index + 1 === meta.page}
                        onClick={() => handleOnClickPage(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })
            : Array(meta.pageCount)
                .fill(1)
                .map((_, index) => {
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink
                        className="cursor-pointer"
                        isActive={index + 1 === meta.page}
                        onClick={() => handleOnClickPage(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

          {meta.hasNextPage ? (
            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={() =>
                  meta.hasNextPage ? handleOnClickPage(meta.page + 1) : null
                }
              />
            </PaginationItem>
          ) : null}
          <PaginationItem className="flex items-center space-x-2">
            <Input
              ref={pageInputRef}
              type="number"
              min={0}
              className="w-10 text-center"
              placeholder={`${meta.page}`}
            />
            <span>из</span>
            <span>{meta.pageCount}</span>
            <Button
              variant="secondary"
              onClick={() => handleOnApplyInputPage()}
            >
              перейти
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default PaginationBox;
