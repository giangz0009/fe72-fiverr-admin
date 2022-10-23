import { Button } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import UserReadOnlyData from "./UserReadOnlyData";

import "./globalStyles.scss";
import { useDispatch, useSelector } from "react-redux";
import { manageActionTypes } from "features/manage/action";
import UserCreate from "./UserCreate";
import UserUpdate from "./UserUpdate";

function User() {
  const dispatch = useDispatch();

  const crudStatus = useSelector(
    (state) => state.manageReducer.usersListCRUDStatus
  );

  const handleClickAddAdmin = () => {
    dispatch(manageActionTypes.setUsersListCRUDStatus("create"));
  };

  const handleClickComeBack = () => {
    dispatch(manageActionTypes.setUsersListCRUDStatus("read"));
    dispatch(manageActionTypes.setUserUpdateIndex(null));
  };

  return (
    <div className="userManage">
      <Container maxWidth="lg">
        <h1 className="userManageTitle">Quản lý người dùng</h1>
        {crudStatus === "read" && (
          <>
            <div className="addAdminAction">
              <Button onClick={handleClickAddAdmin}>Thêm quản trị viên</Button>
            </div>
            <UserReadOnlyData />
          </>
        )}

        {crudStatus === "create" && (
          <>
            <div className="comebackAction">
              <Button onClick={handleClickComeBack}>Quay lại</Button>
            </div>
            <UserCreate />
          </>
        )}
        {crudStatus === "update" && (
          <>
            <div className="comebackAction">
              <Button onClick={handleClickComeBack}>Quay lại</Button>
            </div>
            <UserUpdate />
          </>
        )}
      </Container>
    </div>
  );
}

export default User;
