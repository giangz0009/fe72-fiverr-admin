import { Button } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

import "./globalStyles.scss";
import { useDispatch, useSelector } from "react-redux";
import JobTypesReadOnlyData from "features/jobTypes/common/components/JobTypesReadOnlyData";
import { jobTypesActionTypes } from "features/jobTypes/jobTypesAction";
import JobTypeCreate from "features/jobTypes/common/components/JobTypeCreate";
import JobTypesUpdate from "features/jobTypes/common/components/JobTypesUpdate";

function JobTypes() {
  const dispatch = useDispatch();

  const crudStatus = useSelector(
    (state) => state.jobTypesReducer.jobTypesListCRUDStatus
  );

  const handleClickAddAdmin = () => {
    dispatch(jobTypesActionTypes.setJobTypesListCRUDStatus("create"));
  };

  const handleClickComeBack = () => {
    dispatch(jobTypesActionTypes.setJobTypesListCRUDStatus("read"));
    dispatch(jobTypesActionTypes.setJobTypeUpdateIndex(null));
  };

  return (
    <div className="userManage">
      <Container maxWidth="lg">
        <h1 className="userManageTitle">Quản lý loại công việc</h1>
        {crudStatus === "read" && (
          <>
            <div className="addAdminAction">
              <Button onClick={handleClickAddAdmin}>Thêm loại công việc</Button>
            </div>
            <JobTypesReadOnlyData />
          </>
        )}

        {crudStatus === "create" && (
          <>
            <div className="comebackAction">
              <Button onClick={handleClickComeBack}>Quay lại</Button>
            </div>
            <JobTypeCreate />
          </>
        )}
        {crudStatus === "update" && (
          <>
            <div className="comebackAction">
              <Button onClick={handleClickComeBack}>Quay lại</Button>
            </div>
            <JobTypesUpdate />
          </>
        )}
      </Container>
    </div>
  );
}

export default JobTypes;
