import { Button } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";

import "./globalStyles.scss";
import { useDispatch, useSelector } from "react-redux";
import JobCreate from "features/jobs/common/components/JobCreate";
import JobUpdate from "features/jobs/common/components/JobUpdate";
import {
  fetchGetServiceJobsListAction,
  fetchGetServiceUsersListAction,
  servicesActionTypes,
} from "features/service/serviceAction";
import ServiceReadOnlyData from "features/service/common/components/ServiceReadOnlyData";

function Service() {
  const dispatch = useDispatch();

  const crudStatus = useSelector(
    (state) => state.serviceReducer.servicesListCRUDStatus
  );

  const handleClickComeBack = () => {
    dispatch(servicesActionTypes.setServicesListCRUDStatus("read"));
    dispatch(servicesActionTypes.setServiceUpdateIndex(null));
  };

  return (
    <div className="userManage">
      <Container maxWidth="lg">
        <h1 className="userManageTitle">Quản lý dịch vụ</h1>
        {crudStatus === "read" && <ServiceReadOnlyData />}

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

export default Service;
