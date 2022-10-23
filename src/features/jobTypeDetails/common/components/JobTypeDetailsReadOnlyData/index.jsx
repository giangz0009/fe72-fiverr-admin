import { Button } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./globalStyles.scss";
import JobTypesReadOnlyDataTable from "./JobTypeDetailsReadOnlyDataTable";
import { fetchGetJobTypeDetailsListPagination } from "features/jobTypeDetails/jobTypeDetailsAction";

function JobTypeDetailsReadOnlyData() {
  const [searchValue, setSearchValue] = useState("");

  const pageConfig = useSelector(
    (state) => state.jobTypeDetailsReducer.jobTypeDetailsListPageConfig
  );

  const dispatch = useDispatch();

  let timeOut = null;

  useEffect(() => {
    dispatch(fetchGetJobTypeDetailsListPagination(searchValue));
  }, []);
  useEffect(() => {
    dispatch(fetchGetJobTypeDetailsListPagination(searchValue));
  }, [pageConfig.pageIndex, pageConfig.pageSize]);

  const handleOnKeyUpSearchInput = (e) => {
    clearTimeout(timeOut);
    setSearchValue(e.target.value);

    timeOut = setTimeout(() => {
      dispatch(fetchGetJobTypeDetailsListPagination(searchValue));
    }, 600);
  };

  const handleSearch = () => {
    dispatch(fetchGetJobTypeDetailsListPagination(searchValue));
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

export default JobTypeDetailsReadOnlyData;
