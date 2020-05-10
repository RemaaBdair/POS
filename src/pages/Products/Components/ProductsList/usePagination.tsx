import React, { useState } from "react";
const usePagination = (defaultRowsPerPage: number) => {
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [page, setPage] = useState(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage };
};
export default usePagination;
