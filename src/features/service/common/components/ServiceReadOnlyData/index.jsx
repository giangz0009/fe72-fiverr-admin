import { Button } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./globalStyles.scss";
import JobReadOnlyDataTable from "./ServiceReadOnlyDataTable";
import { fetchGetServicesListPagination } from "features/service/serviceAction";
import ServiceReadOnlyDataTable from "./ServiceReadOnlyDataTable";

function ServiceReadOnlyData() {
  const [searchValue, setSearchValue] = useState("");

  const pageConfig = useSelector(
    (state) => state.serviceReducer.servicesListPageConfig
  );

  const dispatch = useDispatch();

  let timeOut = null;

  useEffect(() => {
    dispatch(fetchGetServicesListPagination(searchValue));
  }, []);
  useEffect(() => {
    dispatch(fetchGetServicesListPagination(searchValue));
  }, [pageConfig.pageIndex, pageConfig.pageSize]);

  const handleOnKeyUpSearchInput = (e) => {
    clearTimeout(timeOut);
    setSearchValue(e.target.value);

    timeOut = setTimeout(() => {
      dispatch(fetchGetServicesListPagination(searchValue));
    }, 600);
  };

  const handleSearch = () => {
    dispatch(fetchGetServicesListPagination(searchValue));
  };

  return (
    <div className="userReadOnlyData">
      {/* <div className="filter">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyUp={handleOnKeyUpSearchInput}
          placeholder="Nhập nội dung tìm kiếm"
        />
        <Button variant="container" onClick={handleSearch}>
          Tìm kiếm
        </Button>
      </div> */}
      <ServiceReadOnlyDataTable />
    </div>
  );
}

export default ServiceReadOnlyData;
