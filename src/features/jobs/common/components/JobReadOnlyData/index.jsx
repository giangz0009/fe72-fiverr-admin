import { Button } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./globalStyles.scss";
import { fetchGetJobsListPagination } from "features/jobs/jobsAction";
import JobReadOnlyDataTable from "./JobReadOnlyDataTable";

function JobReadOnlyData() {
  const [searchValue, setSearchValue] = useState("");

  const pageConfig = useSelector(
    (state) => state.jobsReducer.jobsListPageConfig
  );

  const dispatch = useDispatch();

  let timeOut = null;

  useEffect(() => {
    dispatch(fetchGetJobsListPagination(searchValue));
  }, []);
  useEffect(() => {
    dispatch(fetchGetJobsListPagination(searchValue));
  }, [pageConfig.pageIndex, pageConfig.pageSize]);

  const handleOnKeyUpSearchInput = (e) => {
    clearTimeout(timeOut);
    setSearchValue(e.target.value);

    timeOut = setTimeout(() => {
      dispatch(fetchGetJobsListPagination(searchValue));
    }, 600);
  };

  const handleSearch = () => {
    dispatch(fetchGetJobsListPagination(searchValue));
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
      <JobReadOnlyDataTable />
    </div>
  );
}

export default JobReadOnlyData;
