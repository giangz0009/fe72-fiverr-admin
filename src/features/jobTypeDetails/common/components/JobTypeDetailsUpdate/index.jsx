import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import {
  Autocomplete,
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
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WorkIcon from "@mui/icons-material/Work";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import "./globalStyles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCreateJobTypeDetailAction,
  fetchGetJobTypeDetailsListPagination,
  fetchUpdateJobTypeDetailAction,
  jobTypeDetailsActionTypes,
} from "features/jobTypeDetails/jobTypeDetailsAction";

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

function JobTypeDetailUpdate() {
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [isOpenFailModal, setIsOpenFailModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "Chúc mừng",
    content: "Chúc mừng, cập nhật thành công!",
  });

  const dispatch = useDispatch();

  const jobTypeGroup = useSelector(
    (state) => state.jobTypeDetailsReducer.jobTypeDetailsMenu
  );
  const updateIndex = useSelector(
    (state) => state.jobTypeDetailsReducer.jobTypeDetailUpdateIndex
  );
  const jobTypeDetails = useSelector(
    (state) => state.jobTypeDetailsReducer.jobTypeDetailsList
  );
  const jobTypeDetailUpdateData = jobTypeDetails[updateIndex];

  const getAllJobTypeDetails = () => {
    const checkIsExist = new Set([]);

    const res = jobTypeGroup.reduce((curr, next) => {
      const { dsNhomChiTietLoai } = next;

      const jobDetails = dsNhomChiTietLoai.reduce((currVal, nextVal) => {
        return [...currVal, ...nextVal.dsChiTietLoai];
      }, []);

      const remapJobDetails = jobDetails.filter((item) => {
        const isFoundItem = Array.from(checkIsExist).find(
          (exist) => exist === item.id
        );

        if (isFoundItem) return false;

        checkIsExist.add(item.id);
        return item;
      });

      return [...curr, ...remapJobDetails];
    }, []);

    return addFirstLetter(res);
  };

  const addFirstLetter = (array) => {
    return array.map((item) => {
      const firstLetter = item.tenChiTiet[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...item,
      };
    });
  };

  const options = getAllJobTypeDetails().sort(
    (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
  );

  const filterDsChiTietLoai = options.filter((jobType) => {
    const isFound = jobTypeDetailUpdateData.dsChiTietLoai.find(
      (item) => item.id === jobType.id
    );

    if (!isFound) return false;
    return true;
  });

  const formik = useFormik({
    initialValues: {
      tenChiTiet: jobTypeDetailUpdateData.tenNhom,
      maLoaiCongViec: jobTypeDetailUpdateData.maLoaiCongviec,
      danhSachChiTiet: filterDsChiTietLoai,
      hinhAnh: "",
    },
    validationSchema: Yup.object({
      tenChiTiet: Yup.string().required("*Hãy nhập tên loại công việc!"),
      maLoaiCongViec: Yup.string().required("*Hãy chọn loại công việc!"),
    }),
    onSubmit: async (values) => {
      const res = await dispatch(fetchUpdateJobTypeDetailAction(values));

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
    await dispatch(fetchGetJobTypeDetailsListPagination(""));
    dispatch(jobTypeDetailsActionTypes.setJobTypeDetailsListCRUDStatus("read"));
  };
  const handleCloseSuccessModal = () => {
    setIsOpenSuccessModal(false);
  };
  const handleCloseFailModal = () => {
    setIsOpenFailModal(false);
  };

  return (
    <div className="userCreateWrapper">
      <h1 className="title">Cập nhật nhóm loại công việc</h1>
      <form onSubmit={formik.handleSubmit} className="form">
        {/* Form Group */}
        <div className="formGroup">
          {formik.touched.maLoaiCongViec && formik.errors.maLoaiCongViec ? (
            <FormControl sx={{ m: 1, minWidth: 120 }} error>
              <InputLabel id="demo-simple-select-error-label">
                Nhóm loại công việc
              </InputLabel>
              <Select
                labelId="demo-simple-select-error-label"
                id="maLoaiCongViec"
                name="maLoaiCongViec"
                value={formik.values.maLoaiCongViec}
                label="Nhóm loại công việc:"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {jobTypeGroup.map((jobType) => (
                  <MenuItem value={jobType.id} key={jobType.id}>
                    {jobType.tenLoaiCongViec}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{formik.errors.maLoaiCongViec}</FormHelperText>
            </FormControl>
          ) : (
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-error-label">
                Nhóm loại công việc
              </InputLabel>
              <Select
                labelId="demo-simple-select-error-label"
                id="maLoaiCongViec"
                name="maLoaiCongViec"
                value={formik.values.maLoaiCongViec}
                label="Nhóm loại công việc:"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {jobTypeGroup.map((jobType) => (
                  <MenuItem value={jobType.id} key={jobType.id}>
                    {jobType.tenLoaiCongViec}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </div>
        {/* Form Group */}
        <div className="formGroup">
          {formik.touched.tenChiTiet && formik.errors.tenChiTiet ? (
            <TextField
              id="tenChiTiet"
              name="tenChiTiet"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tenChiTiet}
              label="Tên nhóm loại công việc:"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WorkIcon />
                  </InputAdornment>
                ),
              }}
              error
              helperText={formik.errors.tenChiTiet}
            />
          ) : (
            <TextField
              id="tenChiTiet"
              name="tenChiTiet"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tenChiTiet}
              label="Tên nhóm loại công việc:"
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
          <Autocomplete
            filterSelectedOptions
            multiple
            id="tags-outlined"
            options={options}
            defaultValue={filterDsChiTietLoai}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.tenChiTiet}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.tenChiTiet}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tên Chi Tiết"
                placeholder="Favorites"
              />
            )}
            onChange={(e, newValue) => {
              formik.values.danhSachChiTiet = newValue;
            }}
          />
        </div>
        {/* Form Group */}
        <div className="formGroup">
          <TextField
            type="file"
            id="tenChiTiet"
            name="tenChiTiet"
            label="Ảnh:"
            variant="outlined"
            onChange={(e) => {
              const form = new FormData();
              const file = e.target.files[0];
              form.append("formFile", file);
              formik.values.hinhAnh = form;
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <UploadFileIcon />
                </InputAdornment>
              ),
            }}
          />
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

export default JobTypeDetailUpdate;
