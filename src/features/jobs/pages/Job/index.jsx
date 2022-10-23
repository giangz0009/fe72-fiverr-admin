import { Button } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";

import "./globalStyles.scss";
import { useDispatch, useSelector } from "react-redux";
import JobReadOnlyData from "features/jobs/common/components/JobReadOnlyData";
import JobCreate from "features/jobs/common/components/JobCreate";
import { fetchGetJobTypeMenu, jobsActionTypes } from "features/jobs/jobsAction";
import JobUpdate from "features/jobs/common/components/JobUpdate";

function Job() {
  const dispatch = useDispatch();

  const crudStatus = useSelector(
    (state) => state.jobsReducer.jobsListCRUDStatus
  );

  useEffect(() => {
    dispatch(fetchGetJobTypeMenu());
  }, []);

  const handleClickAddAdmin = () => {
    dispatch(jobsActionTypes.setJobsListCRUDStatus("create"));
  };

  const handleClickComeBack = () => {
    dispatch(jobsActionTypes.setJobsListCRUDStatus("read"));
    dispatch(jobsActionTypes.setJobUpdateIndex(null));
  };

  return (
    <div className="userManage">
      <Container maxWidth="lg">
        <h1 className="userManageTitle">Quản lý công việc</h1>
        {crudStatus === "read" && (
          <>
            <div className="addAdminAction">
              <Button onClick={handleClickAddAdmin}>Thêm công việc</Button>
            </div>
            <JobReadOnlyData />
          </>
        )}

        {crudStatus === "create" && (
          <>
            <div className="comebackAction">
              <Button onClick={handleClickComeBack}>Quay lại</Button>
            </div>
            <JobCreate />
          </>
        )}
        {crudStatus === "update" && (
          <>
            <div className="comebackAction">
              <Button onClick={handleClickComeBack}>Quay lại</Button>
            </div>
            <JobUpdate />
          </>
        )}
      </Container>
    </div>
  );
}

export default Job;
