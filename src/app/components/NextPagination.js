import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useState } from "react";
import Pagination from "react-js-pagination";

export default function NextPagination({ totalItemsCount = 0 }) {
  const [pageNumber, setPageNumber] = useState(1);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const itemsCountPerPage = searchParams.get("recordPerPage") || 10;

  const handleChange = (pageNo) => {
    setPageNumber(pageNo);
    const queryParams = new URLSearchParams(searchParams);
    // update search params
    queryParams.set("page", pageNo);
    router.push(`${pathname}?${queryParams}`, { scroll: false });
  };

  return (
    <Pagination
      activePage={pageNumber}
      itemsCountPerPage={itemsCountPerPage}
      totalItemsCount={totalItemsCount}
      pageRangeDisplayed={itemsCountPerPage}
      onChange={handleChange}
      itemClass="page-item"
      linkClass="page-link"
      innerClass="pagination float-end"
    />
  );
}
