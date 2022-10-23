import instance from "app/instance";

const { createAction } = require("@reduxjs/toolkit");

const jobsActionTypes = {
  setJobsList: createAction("Jobs/SET_JOBS_LIST"),
  setJobsListPageConfig: createAction("Jobs/SET_JOBS_LIST_PAGE_CONFIG"),
  setJobsListPageSize: createAction("Jobs/SET_JOBS_LIST_PAGE_SIZE"),
  setJobsListPageIndex: createAction("Jobs/SET_JOB_LIST_PAGE_INDEX"),
  setJobsListCRUDStatus: createAction("Jobs/SET_JOB_LIST_CRUD_STATUS"),
  setJobUpdateIndex: createAction("Jobs/SET_JOB_UPDATE_INDEX"),
  setJobTypeMenu: createAction("Jobs/SET_JOB_TYPE_MENU"),
};

const fetchGetJobTypeMenu = () => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/cong-viec/lay-menu-loai-cong-viec",
        method: "GET",
      });

      dispatch(jobsActionTypes.setJobTypeMenu(res.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

const fetchUpdateJobAction = (data) => {
  return async (dispatch, getState) => {
    try {
      const jobsList = getState().jobsReducer.jobsList;
      const updateIndex = getState().jobsReducer.jobUpdateIndex;
      const updateData = jobsList[updateIndex];

      const res = await instance.request({
        url: `/api/cong-viec/${updateData.id}`,
        method: "PUT",
        data: {
          ...updateData,
          ...data,
          hinhAnh: updateData.hinhAnh,
        },
      });

      const resData = res.data.content;
      const jobId = resData.id;

      if (data.hinhAnh) {
        await fetchUploadImageJobAction(jobId, data.hinhAnh);
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

const fetchUploadImageJobAction = async (jobId, data) => {
  try {
    await instance.request({
      url: `/api/cong-viec/upload-hinh-cong-viec/${jobId}`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchCreateJobAction = (data) => {
  return async (dispatch, getState) => {
    try {
      const createUserId = getState().authReducer.authProfile.id;

      const res = await instance.request({
        url: `/api/cong-viec`,
        method: "POST",
        data: {
          ...data,
          danhGia: 0,
          nguoiTao: createUserId,
          hinhAnh: "",
          saoCongViec: 5,
        },
      });

      const resData = res.data.content;

      const createdJobId = resData.id;

      await fetchUploadImageJobAction(createdJobId, data.hinhAnh);

      return {
        type: "Chúc mừng!",
        content: "Tạo công việc thành công",
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

const fetchDeleteJobById = (jobId) => {
  return async (dispatch) => {
    try {
      await instance.request({
        url: `/api/cong-viec/${jobId}`,
        method: "DELETE",
      });

      await dispatch(fetchGetJobsListPagination(""));

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

const fetchGetJobsListPagination = (searchValue) => {
  return async (dispatch, getState) => {
    try {
      const pageConfig = getState().jobsReducer.jobsListPageConfig;
      const res = await instance.request({
        url: `/api/cong-viec/phan-trang-tim-kiem/?pageIndex=${pageConfig.pageIndex}&pageSize=${pageConfig.pageSize}&keyword=${searchValue}`,
      });

      const resData = res.data.content;

      dispatch(
        jobsActionTypes.setJobsListPageConfig({
          pageIndex: resData.pageIndex,
          pageSize: resData.pageSize,
          totalRow: resData.totalRow,
        })
      );

      dispatch(jobsActionTypes.setJobsList(resData.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  jobsActionTypes,
  fetchGetJobsListPagination,
  fetchDeleteJobById,
  fetchCreateJobAction,
  fetchUpdateJobAction,
  fetchGetJobTypeMenu,
  fetchUploadImageJobAction,
};
