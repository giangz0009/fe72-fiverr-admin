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
  InputAdornment,
  TextField,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import "./globalStyles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetJobsListPagination,
  fetchUpdateJobAction,
  jobsActionTypes,
} from "features/jobs/jobsAction";
import {
  fetchGetJobTypesListPagination,
  fetchUpdateJobTypeAction,
  jobTypesActionTypes,
} from "features/jobTypes/jobTypesAction";

function JobTypesUpdate() {
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [isOpenFailModal, setIsOpenFailModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "Chúc mừng",
    content: "Chúc mừng, tạo thành công!",
  });

  const dispatch = useDispatch();

  const jobTypesList = useSelector(
    (state) => state.jobTypesReducer.jobTypesList
  );
  const updateIndex = useSelector(
    (state) => state.jobTypesReducer.jobTypeUpdateIndex
  );
  const updateData = jobTypesList[updateIndex];

  const formik = useFormik({
    initialValues: {
      tenLoaiCongViec: updateData.tenLoaiCongViec,
    },
    validationSchema: Yup.object({
      tenLoaiCongViec: Yup.string().required("*Hãy nhập tên loại công việc!"),
    }),
    onSubmit: async (values) => {
      const res = await dispatch(fetchUpdateJobTypeAction(values));

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
    await dispatch(fetchGetJobTypesListPagination(""));
    dispatch(jobTypesActionTypes.setJobTypeUpdateIndex(null));
    dispatch(jobTypesActionTypes.setJobTypesListCRUDStatus("read"));
  };
  const handleCloseSuccessModal = () => {
    setIsOpenSuccessModal(false);
  };
  const handleCloseFailModal = () => {
    setIsOpenFailModal(false);
  };

  return (
    <div className="userCreateWrapper">
      <h1 className="title">Cập nhật loại công việc</h1>
      <form onSubmit={formik.handleSubmit} className="form">
        {/* Form Group */}
        <div className="formGroup">
          {formik.touched.tenLoaiCongViec && formik.errors.tenLoaiCongViec ? (
            <TextField
              id="tenLoaiCongViec"
              name="tenLoaiCongViec"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tenLoaiCongViec}
              label="Tên loại công việc:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WorkIcon />
                  </InputAdornment>
                ),
              }}
              error
              helperText={formik.errors.tenLoaiCongViec}
            />
          ) : (
            <TextField
              id="tenLoaiCongViec"
              name="tenLoaiCongViec"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tenLoaiCongViec}
              label="Tên loại công việc:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WorkIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </div>
        {/* Form Action */}
        <div className="formAction">
          <Button className="reset" onClick={formik.handleReset} type="reset">
            Hủy
          </Button>
          <Button className="submit" type="submit">
            Cập nhật
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

export default JobTypesUpdate;
