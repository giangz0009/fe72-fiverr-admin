import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { authActionTypes, fetchUploadImageAction } from "features/auth/action";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./globalStyles.scss";

function AdminReadOnly() {
  const [isOpenNotifyModal, setIsOpenNotifyModal] = useState(false);
  const [notifiModalConfig, setNotifyModalConfig] = useState({
    type: "notify",
    content: "Notify",
  });

  const { authProfile } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  if (!authProfile) return <div></div>;

  const {
    avatar,
    name,
    email,
    birthday,
    gender,
    role,
    phone,
    skill,
    certification,
  } = authProfile;

  const handleUploadImg = async (e) => {
    const form = new FormData();
    const file = e.target.files[0];
    form.append("formFile", file);
    const res = await dispatch(fetchUploadImageAction(form));
    setNotifyModalConfig(res);
    setIsOpenNotifyModal(true);
  };

  const handleChangeCrudStatus = () => {
    dispatch(authActionTypes.setCrudStatus("update"));
  };

  const handleCloseNotifyModal = () => {
    setIsOpenNotifyModal(false);
  };

  return (
    <div className="adminReadOnly">
      <h1>Thông tin Admin</h1>
      <div className="avatar">
        <Avatar alt={name} src={avatar} />
        <span>{name}</span>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleUploadImg}
          />
          <PhotoCamera />
        </IconButton>
      </div>
      <div className="profile">
        <div className="profileGroup">
          <p>
            <span>Email:</span>
            <span>{email}</span>
          </p>
        </div>
        <div className="profileGroup">
          <p>
            <span>Ngày sinh:</span>
            <span>{birthday}</span>
          </p>
        </div>
        <div className="profileGroup">
          <p>
            <span>Giới tính:</span>
            <span>{gender ? "Nam" : "Nữ"}</span>
          </p>
        </div>
        <div className="profileGroup">
          <p>
            <span>Số điện thoại:</span>
            <span>{phone}</span>
          </p>
        </div>
        <div className="profileGroup">
          <p>
            <span>Kỹ năng:</span>
            <span>{skill.join(", ")}</span>
          </p>
        </div>
        <div className="profileGroup">
          <p>
            <span>Chứng chỉ:</span>
            <span>{certification.join(", ")}</span>
          </p>
        </div>
        <div className="profileGroup">
          <p>
            <span>Quyền:</span>
            <span>{role}</span>
          </p>
        </div>
      </div>
      <div className="action">
        <Button onClick={handleChangeCrudStatus}>Cập nhật</Button>
      </div>
      <Dialog
        open={isOpenNotifyModal}
        onClose={handleCloseNotifyModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {notifiModalConfig.type}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {notifiModalConfig.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNotifyModal}>Hủy</Button>
          <Button onClick={handleCloseNotifyModal} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminReadOnly;
