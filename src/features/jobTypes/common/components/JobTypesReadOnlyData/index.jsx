import { Button } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./globalStyles.scss";
import { fetchGetJobTypesListPagination } from "features/jobTypes/jobTypesAction";
import JobTypesReadOnlyDataTable from "./JobTypesReadOnlyDataTable";

function JobTypesReadOnlyData() {
  const [searchValue, setSearchValue] = useState("");

  const pageConfig = useSelector(
    (state) => state.jobTypesReducer.jobTypesListPageConfig
  );

  const dispatch = useDispatch();

  let timeOut = null;

  useEffect(() => {
    dispatch(fetchGetJobTypesListPagination(searchValue));
  }, []);
  useEffect(() => {
    dispatch(fetchGetJobTypesListPagination(searchValue));
  }, [pageConfig.pageIndex, pageConfig.pageSize]);

  const handleOnKeyUpSearchInput = (e) => {
    clearTimeout(timeOut);
    setSearchValue(e.target.value);

    timeOut = setTimeout(() => {
      dispatch(fetchGetJobTypesListPagination(searchValue));
    }, 600);
  };

  const handleSearch = () => {
    dispatch(fetchGetJobTypesListPagination(searchValue));
  };

  return (
    <div className="userReadOnlyData">
      <div className="filter">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyUp={handleOnKeyUpSearchInput}
          placeholder="Nhập nội dung tìm kiếm"
        />
        <Button variant="container" onClick={handleSearch}>
          Tìm kiếm
        </Button>
      </div>
      <JobTypesReadOnlyDataTable />
    </div>
  );
}

export default JobTypesReadOnlyData;
