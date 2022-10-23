import { Button } from "@mui/material";
import { fetchGetUserListPagination } from "features/manage/action";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserReadOnlyDataTable from "./UserReadOnlyDataTable";

import "./globalStyles.scss";

function UserReadOnlyData() {
  const [searchValue, setSearchValue] = useState("");

  const pageConfig = useSelector(
    (state) => state.manageReducer.usersListPageConfig
  );

  const dispatch = useDispatch();

  let timeOut = null;

  useEffect(() => {
    dispatch(fetchGetUserListPagination(searchValue));
  }, []);
  useEffect(() => {
    dispatch(fetchGetUserListPagination(searchValue));
  }, [pageConfig.pageIndex, pageConfig.pageSize]);

  const handleOnKeyUpSearchInput = (e) => {
    clearTimeout(timeOut);
    setSearchValue(e.target.value);

    timeOut = setTimeout(() => {
      dispatch(fetchGetUserListPagination(searchValue));
    }, 600);
  };

  const handleSearch = () => {
    dispatch(fetchGetUserListPagination(searchValue));
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
      <UserReadOnlyDataTable />
    </div>
  );
}

export default UserReadOnlyData;
