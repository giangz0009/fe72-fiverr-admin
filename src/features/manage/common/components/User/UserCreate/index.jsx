import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import getDayMonthYear from "common/utils/getDayMonthYear";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CelebrationIcon from "@mui/icons-material/Celebration";

import "./globalStyles.scss";
import {
  fetchCreateAdminAction,
  fetchGetUserListPagination,
  manageActionTypes,
} from "features/manage/action";
import { useDispatch } from "react-redux";

function UserCreate() {
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [isOpenFailModal, setIsOpenFailModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "Chúc mừng",
    content: "Chúc mừng, tạo thành công!",
  });

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("*Hãy nhập tên!"),
      email: Yup.string()
        .email("*Kiểu email của bạn chưa chính xác (*@*mail.*)")
        .required("*Hãy nhập email!"),
      password: Yup.string().required("*Hãy nhập mật khẩu!"),
      phone: Yup.string()
        .required("*Hãy nhập số điện thoại!")
        .matches(
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
          "*Số điện thoại chưa chính xác!"
        )
        .min(9, "*Số điện thoại phải có ít nhất 10 số!"),
      birthday: Yup.string()
        .required("*Hãy nhập ngày sinh!")
        .matches(
          /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/i,
          "*Ngày sinh chưa đúng!"
        ),
      gender: Yup.string().required("*Hãy nhập giới tính!"),
    }),
    onSubmit: async (values) => {
      const customDate = getDayMonthYear(values.birthday);
      const customData = {
        ...values,
        birthday: customDate,
      };
      const res = await fetchCreateAdminAction(customData);

      setModalConfig(res);

      if (res.type === "Chúc mừng!") {
        setIsOpenSuccessModal(true);
      } else {
        setIsOpenFailModal(true);
      }
    },
  });
  const handleSubmitSuccessModal = async () => {
    setIsOpenSuccessModal(false);
    await dispatch(fetchGetUserListPagination(""));
    dispatch(manageActionTypes.setUsersListCRUDStatus("read"));
  };
  const handleCloseSuccessModal = () => {
    setIsOpenSuccessModal(false);
  };
  const handleCloseFailModal = () => {
    setIsOpenFailModal(false);
  };

  return (
    <div className="userCreateWrapper">
      <h1 className="title">Tạo Admin</h1>
      <form onSubmit={formik.handleSubmit} className="form">
        {/* Form Group */}
        <div className="formGroup">
          {formik.touched.name && formik.errors.name ? (
            <TextField
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              label="Tên:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              error
              helperText={formik.errors.name}
            />
          ) : (
            <TextField
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              label="Tên:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </div>
        {/* Form Group */}
        <div className="formGroup">
          {formik.touched.email && formik.errors.email ? (
            <TextField
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              label="Email:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              error
              helperText={formik.errors.email}
            />
          ) : (
            <TextField
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              label="Email:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </div>
        {/* Form Group */}
        <div className="formGroup">
          {formik.touched.password && formik.errors.password ? (
            <TextField
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              label="Mật khẩu:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              }}
              error
              helperText={formik.errors.password}
            />
          ) : (
            <TextField
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              label="Mật khẩu:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </div>
        {/* Form Group */}
        <div className="formGroup">
          {formik.touched.phone && formik.errors.phone ? (
            <TextField
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              label="Tên:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalPhoneIcon />
                  </InputAdornment>
                ),
              }}
              error
              helperText={formik.errors.phone}
            />
          ) : (
            <TextField
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              label="Số ĐT:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalPhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </div>
        {/* Form Group */}
        <div className="formGroup">
          {formik.touched.birthday && formik.errors.birthday ? (
            <TextField
              type="date"
              id="birthday"
              name="birthday"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birthday}
              label="Ngày sinh:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CelebrationIcon />
                  </InputAdornment>
                ),
              }}
              error
              helperText={formik.errors.birthday}
            />
          ) : (
            <TextField
              type="date"
              id="birthday"
              name="birthday"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birthday}
              label="Ngày sinh:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CelebrationIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </div>
        {/* Form Group */}
        <div
          className={`formGroup ${
            formik.touched.gender && formik.errors.gender ? "error" : ""
          }`}
        >
          <div className="wrapper">
            <FormLabel id="demo-controlled-radio-buttons-group">
              Gender
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="gender"
              id="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value={false} control={<Radio />} label="Nữ" />
              <FormControlLabel value={true} control={<Radio />} label="Nam" />
            </RadioGroup>
            {formik.touched.gender && formik.errors.gender ? (
              <div className="errorMessage">{formik.errors.gender}</div>
            ) : null}
          </div>
        </div>
        {/* Form Action */}
        <div className="formAction">
          <Button className="reset" onClick={formik.handleReset} type="reset">
            Hủy
          </Button>
          <Button className="submit" type="submit">
            Tạo
          </Button>
        </div>
      </form>
      <Dialog
        open={isOpenSuccessModal}
        onClose={handleCloseSuccessModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{modalConfig.type}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {modalConfig.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessModal}>Hủy</Button>
          <Button onClick={handleSubmitSuccessModal} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isOpenFailModal}
        onClose={handleCloseFailModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{modalConfig.type}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {modalConfig.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFailModal}>Hủy</Button>
          <Button onClick={handleCloseFailModal} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserCreate;
