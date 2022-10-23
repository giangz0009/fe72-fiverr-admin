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
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Select,
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

function JobUpdate() {
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [isOpenFailModal, setIsOpenFailModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "Chúc mừng",
    content: "Chúc mừng, tạo thành công!",
  });

  const dispatch = useDispatch();

  const jobTypeMenu = useSelector((state) => state.jobsReducer.jobTypeMenu);
  const jobsList = useSelector((state) => state.jobsReducer.jobsList);
  const updateIndex = useSelector((state) => state.jobsReducer.jobUpdateIndex);
  const updateData = jobsList[updateIndex];

  const formik = useFormik({
    initialValues: {
      tenCongViec: updateData.tenCongViec,
      giaTien: updateData.giaTien,
      moTa: updateData.moTa,
      moTaNgan: updateData.moTaNgan,
      maChiTietLoaiCongViec: updateData.maChiTietLoaiCongViec,
      hinhAnh: "",
    },
    validationSchema: Yup.object({
      tenCongViec: Yup.string().required("*Hãy nhập tên công việc!"),
      giaTien: Yup.string().required("*Hãy nhập giá!"),
      moTa: Yup.string().required("*Hãy nhập mô tả!"),
      moTaNgan: Yup.string().required("*Hãy nhập mô tả ngắn!"),
      maChiTietLoaiCongViec: Yup.string().required("*Hãy chọn loại công việc!"),
    }),
    onSubmit: async (values) => {
      const res = await dispatch(fetchUpdateJobAction(values));

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
    await dispatch(fetchGetJobsListPagination(""));
    dispatch(jobsActionTypes.setJobUpdateIndex(null));
    dispatch(jobsActionTypes.setJobsListCRUDStatus("read"));
  };
  const handleCloseSuccessModal = () => {
    setIsOpenSuccessModal(false);
  };
  const handleCloseFailModal = () => {
    setIsOpenFailModal(false);
  };

  const renderJobTypeDetailFormGroup = () => {
    const renderJobType = (dsNhomChiTietLoai) => {
      return dsNhomChiTietLoai.map((jobType) => {
        const { dsChiTietLoai } = jobType;

        return dsChiTietLoai.map((item) => (
          <option value={item.id} key={item.id}>
            {item.tenChiTiet}
          </option>
        ));
      });
    };

    return (
      <div className="formGroup">
        {formik.touched.maChiTietLoaiCongViec &&
        formik.errors.maChiTietLoaiCongViec ? (
          <FormControl sx={{ m: 1, minWidth: 120 }} error>
            <InputLabel htmlFor="maChiTietLoaiCongViec">
              Loại Công Việc
            </InputLabel>
            <Select
              native
              id="maChiTietLoaiCongViec"
              name="maChiTietLoaiCongViec"
              label="Loại Công Việc"
              value={formik.values.maChiTietLoaiCongViec}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option aria-label="None" value="" />
              {jobTypeMenu.map((job) => {
                const { dsNhomChiTietLoai } = job;
                return (
                  <optgroup label={job.tenLoaiCongViec} key={job.id}>
                    {renderJobType(dsNhomChiTietLoai)}
                  </optgroup>
                );
              })}
            </Select>
            <FormHelperText>
              {formik.errors.maChiTietLoaiCongViec}
            </FormHelperText>
          </FormControl>
        ) : (
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel htmlFor="maChiTietLoaiCongViec">
              Loại Công Việc
            </InputLabel>
            <Select
              native
              id="maChiTietLoaiCongViec"
              name="maChiTietLoaiCongViec"
              label="Loại Công Việc"
              value={formik.values.maChiTietLoaiCongViec}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option aria-label="None" value="" />
              {jobTypeMenu.map((job) => {
                const { dsNhomChiTietLoai } = job;
                return (
                  <optgroup label={job.tenLoaiCongViec} key={job.id}>
                    {renderJobType(dsNhomChiTietLoai)}
                  </optgroup>
                );
              })}
            </Select>
          </FormControl>
        )}
      </div>
    );
  };

  return (
    <div className="userCreateWrapper">
      <h1 className="title">Thêm công việc</h1>
      <form onSubmit={formik.handleSubmit} className="form">
        {/* Form Group */}
        <div className="formGroup">
          {formik.touched.tenCongViec && formik.errors.tenCongViec ? (
            <TextField
              id="tenCongViec"
              name="tenCongViec"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tenCongViec}
              label="Tên công việc:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WorkIcon />
                  </InputAdornment>
                ),
              }}
              error
              helperText={formik.errors.tenCongViec}
            />
          ) : (
            <TextField
              id="tenCongViec"
              name="tenCongViec"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tenCongViec}
              label="Tên công việc:"
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
        {/* Form Group */}
        <div className="formGroup">
          {formik.touched.giaTien && formik.errors.giaTien ? (
            <TextField
              type="number"
              id="giaTien"
              name="giaTien"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.giaTien}
              label="Giá tiền:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
              }}
              error
              helperText={formik.errors.giaTien}
            />
          ) : (
            <TextField
              type="number"
              id="giaTien"
              name="giaTien"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.giaTien}
              label="Giá tiền:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </div>
        {/* Form Group */}
        <div className="formGroup">
          {formik.touched.moTa && formik.errors.moTa ? (
            <TextField
              multiline
              rows={3}
              id="moTa"
              name="moTa"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.moTa}
              label="Mô tả:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
              error
              helperText={formik.errors.moTa}
            />
          ) : (
            <TextField
              multiline
              rows={3}
              id="moTa"
              name="moTa"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.moTa}
              label="Mô tả:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </div>
        {/* Form Group */}
        <div className="formGroup">
          {formik.touched.moTaNgan && formik.errors.moTaNgan ? (
            <TextField
              multiline
              rows={3}
              id="moTaNgan"
              name="moTaNgan"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.moTaNgan}
              label="Mô tả ngắn:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
              error
              helperText={formik.errors.moTaNgan}
            />
          ) : (
            <TextField
              multiline
              rows={3}
              id="moTaNgan"
              name="moTaNgan"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.moTaNgan}
              label="Mô tả ngắn:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </div>
        {/* Form Group */}
        {renderJobTypeDetailFormGroup()}
        {/* Form Group */}
        <div className="formGroup">
          {formik.touched.hinhAnh && formik.errors.hinhAnh ? (
            <TextField
              type="file"
              id="hinhAnh"
              name="hinhAnh"
              onChange={(e) => {
                const form = new FormData();
                const file = e.target.files[0];
                form.append("formFile", file);
                formik.values.hinhAnh = form;
              }}
              label="Ảnh:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UploadFileIcon />
                  </InputAdornment>
                ),
              }}
              error
              helperText={formik.errors.hinhAnh}
            />
          ) : (
            <TextField
              type="file"
              id="hinhAnh"
              name="hinhAnh"
              onChange={(e) => {
                const form = new FormData();
                const file = e.target.files[0];
                form.append("formFile", file);
                formik.values.hinhAnh = form;
              }}
              label="Ảnh:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UploadFileIcon />
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

export default JobUpdate;
