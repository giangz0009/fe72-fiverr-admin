import instance from "app/instance";

const { createAction } = require("@reduxjs/toolkit");

const jobTypeDetailsActionTypes = {
  setJobTypeDetailsList: createAction(
    "JobTypeDetails/SET_JOB_TYPE_DETAILS_LIST"
  ),
  setJobTypeDetailsListPageConfig: createAction(
    "JobTypeDetails/SET_JOB_TYPE_DETAILS_LIST_PAGE_CONFIG"
  ),
  setJobTypeDetailsListPageSize: createAction(
    "JobTypeDetails/SET_JOB_TYPE_DETAILS_LIST_PAGE_SIZE"
  ),
  setJobTypeDetailsListPageIndex: createAction(
    "JobTypeDetails/SET_JOB_TYPE_DETAIL_LIST_PAGE_INDEX"
  ),
  setJobTypeDetailsListCRUDStatus: createAction(
    "JobTypeDetails/SET_JOB_TYPE_DETAIL_LIST_CRUD_STATUS"
  ),
  setJobTypeDetailUpdateIndex: createAction(
    "JobTypeDetails/SET_JOB_TYPE_DETAIL_UPDATE_INDEX"
  ),
  setJobTypeDetailsMenu: createAction(
    "JobTypeDetails/SET_JOB_TYPE_DETAILS_MENU"
  ),
};

const fetchGetJobTypeDetailsMenuAction = () => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: `/api/cong-viec/lay-menu-loai-cong-viec`,
        method: "GET",
      });

      dispatch(
        jobTypeDetailsActionTypes.setJobTypeDetailsMenu(res.data.content)
      );
    } catch (error) {
      console.log(error);
    }
  };
};

const fetchUpdateJobTypeDetailAction = (data) => {
  return async (dispatch, getState) => {
    try {
      const jobTypeDetailsList =
        getState().jobTypeDetailsReducer.jobTypeDetailsList;
      const updateIndex =
        getState().jobTypeDetailsReducer.jobTypeDetailUpdateIndex;
      const updateData = jobTypeDetailsList[updateIndex];

      const res = await instance.request({
        url: `/api/chi-tiet-loai-cong-viec/sua-nhom-chi-tiet-loai/${updateData.id}`,
        method: "PUT",
        data: {
          tenChiTiet: data.tenChiTiet,
          maLoaiCongViec: data.maLoaiCongViec,
          danhSachChiTiet: !data.danhSachChiTiet
            ? []
            : data.danhSachChiTiet.map((danhSach) => danhSach.id),
        },
      });

      if (data.hinhAnh) {
        await fetchUploadJobTypeGroupImageAction(updateData.id, data.hinhAnh);
      }

      return {
        type: "Chúc mừng!",
        content: "Cập nhật thành công",
      };
    } catch (error) {
      const errorContent = error.response.data.content;
      return {
        type: "Có lỗi xảy ra!",
        content: errorContent,
      };
    }
  };
};

const fetchUploadJobTypeGroupImageAction = async (id, data) => {
  try {
    await instance.request({
      url: `/api/chi-tiet-loai-cong-viec/upload-hinh-nhom-loai-cong-viec/${id}`,
      method: "POST",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchCreateJobTypeDetailAction = (data) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: `/api/chi-tiet-loai-cong-viec/them-nhom-chi-tiet-loai`,
        method: "POST",
        data: {
          tenChiTiet: data.tenChiTiet,
          maLoaiCongViec: data.maLoaiCongViec,
          danhSachChiTiet: !data.danhSachChiTiet
            ? []
            : data.danhSachChiTiet.map((danhSach) => danhSach.id),
        },
      });

      if (data.hinhAnh) {
        const resId = res.data.content.id;

        await fetchUploadJobTypeGroupImageAction(resId, data.hinhAnh);
      }

      return {
        type: "Chúc mừng!",
        content: "Tạo nhóm loại công việc thành công",
      };
    } catch (error) {
      const errorContent = error.response.data.content;
      return {
        type: "Có lỗi xảy ra!",
        content: errorContent,
      };
    }
  };
};

const fetchDeleteJobTypeDetailById = (jobTypeId) => {
  return async (dispatch) => {
    try {
      await instance.request({
        url: `/api/chi-tiet-loai-cong-viec/${jobTypeId}`,
        method: "DELETE",
      });

      await dispatch(fetchGetJobTypeDetailsListPagination(""));

      return {
        title: "Success",
        label: "Xóa thành công!",
      };
    } catch (error) {
      return {
        title: "Fail",
        label: "Có lỗi xảy ra!",
      };
    }
  };
};

const fetchGetJobTypeDetailsListPagination = (searchValue) => {
  return async (dispatch, getState) => {
    try {
      const pageConfig =
        getState().jobTypeDetailsReducer.jobTypeDetailsListPageConfig;
      const res = await instance.request({
        url: `/api/chi-tiet-loai-cong-viec/phan-trang-tim-kiem/?pageIndex=${pageConfig.pageIndex}&pageSize=${pageConfig.pageSize}&keyword=${searchValue}`,
      });

      const resData = res.data.content;

      dispatch(
        jobTypeDetailsActionTypes.setJobTypeDetailsListPageConfig({
          pageIndex: resData.pageIndex,
          pageSize: resData.pageSize,
          totalRow: resData.totalRow,
        })
      );

      dispatch(jobTypeDetailsActionTypes.setJobTypeDetailsList(resData.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  jobTypeDetailsActionTypes,
  fetchGetJobTypeDetailsListPagination,
  fetchDeleteJobTypeDetailById,
  fetchCreateJobTypeDetailAction,
  fetchUpdateJobTypeDetailAction,
  fetchGetJobTypeDetailsMenuAction,
};
