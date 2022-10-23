import { Container } from "@mui/system";
import AdminReadOnly from "features/auth/common/components/AdminReadOnly";
import AdminUpdate from "features/auth/common/components/AdminUpdate";
import React from "react";
import { useSelector } from "react-redux";

import "./globalStyles.scss";

function Profile() {
  const crudStatus = useSelector((state) => state.authReducer.crudStatus);

  return (
    <div className="adminProfileWrapper">
      <Container maxWidth="lg">
        {crudStatus === "read" && <AdminReadOnly />}
        {crudStatus === "update" && <AdminUpdate />}
      </Container>
    </div>
  );
}

export default Profile;
