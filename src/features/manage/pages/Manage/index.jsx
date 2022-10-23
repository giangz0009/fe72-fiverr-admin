import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Container } from "@mui/system";
import HeaderComp from "common/components/HeaderComp";
import {
  authActionTypes,
  fetchSetAuthProfileByIdAction,
} from "features/auth/action";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function Manage() {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loginConfirm = useSelector((state) => state.authReducer.loginConfirm);

  useEffect(() => {
    const authProfile = localStorage.getItem("authProfile");

    if (!authProfile) navigate("/");
    else {
      const parseAuthProfile = JSON.parse(authProfile);
      dispatch(fetchSetAuthProfileByIdAction(parseAuthProfile.id));
    }
    if (loginConfirm) setIsOpenConfirm(true);
  }, []);

  const handleClose = () => {
    dispatch(authActionTypes.setLoginConfirm(null));
    setIsOpenConfirm(false);
  };

  return (
    <div>
      <HeaderComp />
      <Outlet />
      <Dialog
        open={isOpenConfirm}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Chúc mừng
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Đăng nhập thành công!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Hủy
          </Button>
          <Button onClick={handleClose}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Manage;
