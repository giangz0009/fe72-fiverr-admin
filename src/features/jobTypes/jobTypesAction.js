import instance from "app/instance";

const { createAction } = require("@reduxjs/toolkit");

const jobTypesActionTypes = {
  setJobTypesList: createAction("JobTypes/SET_JOB_TYPES_LIST"),
  setJobTypesListPageConfig: createAction(
    "JobTypes/SET_JOB_TYPES_LIST_PAGE_CONFIG"
  ),
  setJobTypesListPageSize: createAction(
    "JobTypes/SET_JOB_TYPES_LIST_PAGE_SIZE"
  ),
  setJobTypesListPageIndex: createAction(
    "JobTypes/SET_JOB_TYPES_LIST_PAGE_INDEX"
  ),
  setJobTypesListCRUDStatus: createAction(
    "JobTypes/SET_JOB_TYPES_LIST_CRUD_STATUS"
  ),
  setJobTypeUpdateIndex: createAction("JobTypes/SET_JOB_TYPE_UPDATE_INDEX"),
};

const fetchUpdateJobTypeAction = (data) => {
  return async (dispatch, getState) => {
    try {
      const jobTypesList = getState().jobTypesReducer.jobTypesList;
      const updateIndex = getState().jobTypesReducer.jobTypeUpdateIndex;
      const updateData = jobTypesList[updateIndex];

      await instance.request({
        url: `/api/loai-cong-viec/${updateData.id}`,
        method: "PUT",
        data: data,
      });

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

const fetchCreateJobTypeAction = (data) => {
  return async (dispatch) => {
    try {
      await instance.request({
        url: `/api/loai-cong-viec`,
        method: "POST",
        data: data,
      });

      return {
        type: "Chúc mừng!",
        content: "Tạo loại công việc thành công",
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

const fetchDeleteJobTypeById = (jobTypeId) => {
  return async (dispatch) => {
    try {
      await instance.request({
        url: `/api/loai-cong-viec/${jobTypeId}`,
        method: "DELETE",
      });

      await dispatch(fetchGetJobTypesListPagination(""));

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

const fetchGetJobTypesListPagination = (searchValue) => {
  return async (dispatch, getState) => {
    try {
      const pageConfig = getState().jobTypesReducer.jobTypesListPageConfig;
      const res = await instance.request({
        url: `/api/loai-cong-viec/phan-trang-tim-kiem/?pageIndex=${pageConfig.pageIndex}&pageSize=${pageConfig.pageSize}&keyword=${searchValue}`,
      });

      const resData = res.data.content;

      dispatch(
        jobTypesActionTypes.setJobTypesListPageConfig({
          pageIndex: resData.pageIndex,
          pageSize: resData.pageSize,
          totalRow: resData.totalRow,
        })
      );

      dispatch(jobTypesActionTypes.setJobTypesList(resData.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  jobTypesActionTypes,
  fetchGetJobTypesListPagination,
  fetchDeleteJobTypeById,
  fetchCreateJobTypeAction,
  fetchUpdateJobTypeAction,
};
