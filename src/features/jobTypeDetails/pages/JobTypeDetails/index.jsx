import { Button } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";

import "./globalStyles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetJobTypeDetailsMenuAction,
  jobTypeDetailsActionTypes,
} from "features/jobTypeDetails/jobTypeDetailsAction";
import JobTypeDetailsReadOnlyData from "features/jobTypeDetails/common/components/JobTypeDetailsReadOnlyData";
import JobTypeGroupCreate from "features/jobTypeDetails/common/components/JobTypeGroupCreate";
import JobTypeDetailUpdate from "features/jobTypeDetails/common/components/JobTypeDetailsUpdate";

function JobTypeDetails() {
  const dispatch = useDispatch();

  const crudStatus = useSelector(
    (state) => state.jobTypeDetailsReducer.jobTypeDetailsListCRUDStatus
  );

  useEffect(() => {
    dispatch(fetchGetJobTypeDetailsMenuAction());
  }, []);

  const handleClickAddJobTypeGroup = () => {
    dispatch(
      jobTypeDetailsActionTypes.setJobTypeDetailsListCRUDStatus(
        "createJobTypeGroup"
      )
    );
  };

  const handleClickComeBack = () => {
    dispatch(jobTypeDetailsActionTypes.setJobTypeDetailsListCRUDStatus("read"));
    dispatch(jobTypeDetailsActionTypes.setJobTypeDetailUpdateIndex(null));
  };

  return (
    <div className="userManage">
      <Container maxWidth="lg">
        <h1 className="userManageTitle">Quản lý chi tiết loại công việc</h1>
        {crudStatus === "read" && (
          <>
            <div className="addAdminAction">
              <Button onClick={handleClickAddJobTypeGroup}>
                Thêm nhóm loại công việc
              </Button>
            </div>
            <JobTypeDetailsReadOnlyData />
          </>
        )}

        {crudStatus === "createJobTypeGroup" && (
          <>
            <div className="comebackAction">
              <Button onClick={handleClickComeBack}>Quay lại</Button>
            </div>
            <JobTypeGroupCreate />
          </>
        )}
        {crudStatus === "update" && (
          <>
            <div className="comebackAction">
              <Button onClick={handleClickComeBack}>Quay lại</Button>
            </div>
            <JobTypeDetailUpdate />
          </>
        )}
      </Container>
    </div>
  );
}

export default JobTypeDetails;
