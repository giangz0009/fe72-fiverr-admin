import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./globalStyles.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import { useDispatch } from "react-redux";
import { fetchSetAuthProfileAction } from "features/auth/action";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({
    type: "Notification",
    content: "You do not have permission to login to this site!",
  });

  useEffect(() => {
    const authProfile = localStorage.getItem("authProfile");
    if (authProfile) navigate("/manage/user");
  });

  const handleClose = () => {
    setIsOpenConfirm(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("*Please enter the correct email type (*@*mail.*)")
        .required("*Please enter your email!"),
      password: Yup.string().required("*Please enter your password!"),
    }),
    onSubmit: async (values) => {
      const res = await dispatch(fetchSetAuthProfileAction(values));

      if (res.type !== "Success") {
        setConfirmConfig(res);
        setIsOpenConfirm(true);
      } else {
        navigate("/manage/user");
      }
    },
  });

  return (
    <div className="adminLogin">
      <div className="formWrapper">
        <h1>Login</h1>
        <form className="form" onSubmit={formik.handleSubmit}>
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
                      <AccountCircle />
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
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </div>
          <div className="formGroup">
            {formik.touched.password && formik.errors.password ? (
              <TextField
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                label="Password:"
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
                label="Password:"
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
          <div className="action">
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
      <Dialog
        open={isOpenConfirm}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {confirmConfig.type}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmConfig.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SignIn;
