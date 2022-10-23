import instance from "app/instance";

const { createAction } = require("@reduxjs/toolkit");

const servicesActionTypes = {
  setServicesList: createAction("Service/SET_SERVICES_LIST"),
  setServicesListPageConfig: createAction(
    "Service/SET_SERVICES_LIST_PAGE_CONFIG"
  ),
  setServicesListPageSize: createAction("Service/SET_SERVICES_LIST_PAGE_SIZE"),
  setServicesListPageIndex: createAction("Service/SET_SERVICE_LIST_PAGE_INDEX"),
  setServicesListCRUDStatus: createAction(
    "Service/SET_SERVICE_LIST_CRUD_STATUS"
  ),
  setServiceUpdateIndex: createAction("Service/SET_SERVICE_UPDATE_INDEX"),
  setServiceUsersList: createAction("Service/SET_SERVICE_USERS_LIST"),
  setServiceJobsList: createAction("Service/SET_SERVICE_JOBS_LIST"),
};

const fetchCompleteServiceAction = (id) => {
  return async (dispatch) => {
    try {
      await instance.request({
        url: `/api/thue-cong-viec/hoan-thanh-cong-viec/${id}`,
        method: "POST",
      });

      await dispatch(fetchGetServicesListPagination(""));

      return {
        title: "Chúc mừng!",
        label: "Công việc đã hoàn thành",
      };
    } catch (error) {
      const errorContent = error.response.data.content;
      return {
        title: "Có lỗi xảy ra!",
        label: errorContent,
      };
    }
  };
};

const fetchGetServiceJobsListAction = () => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/cong-viec",
        method: "GET",
      });

      dispatch(servicesActionTypes.setServiceJobsList(res.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

const fetchGetServiceUsersListAction = () => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/users",
        method: "GET",
      });

      dispatch(servicesActionTypes.setServiceUsersList(res.data.content));
    } catch (error) {
      console.log(error);
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

const fetchDeleteServiceById = (jobId) => {
  return async (dispatch) => {
    try {
      await instance.request({
        url: `/api/thue-cong-viec/${jobId}`,
        method: "DELETE",
      });

      await dispatch(fetchGetServicesListPagination(""));

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

const fetchGetServicesListPagination = (searchValue) => {
  return async (dispatch, getState) => {
    try {
      const pageConfig = getState().serviceReducer.servicesListPageConfig;

      const res = await instance.request({
        url: `/api/thue-cong-viec/phan-trang-tim-kiem/?pageIndex=${pageConfig.pageIndex}&pageSize=${pageConfig.pageSize}&keyword=${searchValue}`,
      });

      await dispatch(fetchGetServiceUsersListAction());
      await dispatch(fetchGetServiceJobsListAction());

      const { serviceUsersList, serviceJobsList } = getState().serviceReducer;

      const resData = res.data.content;

      const resDataMap = resData.data.map((service) => {
        const foundInJobsList = serviceJobsList.find(
          (job) => job.id === service.maCongViec
        );
        const foundInUsersList = serviceUsersList.find(
          (user) => user.id === service.maNguoiThue
        );

        const resCustom = {
          ...service,
          user: { ...foundInUsersList },
          job: { ...foundInJobsList },
        };

        return resCustom;
      });

      dispatch(
        servicesActionTypes.setServicesListPageConfig({
          pageIndex: resData.pageIndex,
          pageSize: resData.pageSize,
          totalRow: resData.totalRow,
        })
      );

      dispatch(servicesActionTypes.setServicesList(resDataMap));
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  servicesActionTypes,
  fetchGetServicesListPagination,
  fetchDeleteServiceById,
  fetchCreateJobAction,
  fetchUploadImageJobAction,
  fetchGetServiceUsersListAction,
  fetchGetServiceJobsListAction,
  fetchCompleteServiceAction,
};
