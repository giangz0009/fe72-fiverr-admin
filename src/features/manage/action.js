import instance from "app/instance";

const { createAction } = require("@reduxjs/toolkit");

const manageActionTypes = {
  setUserList: createAction("Manage/SET_USER_LIST"),
  setUsersListPageConfig: createAction("Manage/SET_USER_LIST_PAGE_CONFIG"),
  setUsersListPageSize: createAction("Manage/SET_USER_LIST_PAGE_SIZE"),
  setUsersListPageIndex: createAction("Manage/SET_USER_LIST_PAGE_INDEX"),
  setUsersListCRUDStatus: createAction("Manage/SET_USER_LIST_CRUD_STATUS"),
  setUserUpdateIndex: createAction("Manage/SET_USER_UPDATE_INDEX"),
};

const fetchUpdateUserAction = async (data) => {
  try {
    await instance.request({
      url: `/api/users/${data.id}`,
      method: "PUT",
      data: {
        ...data,
      },
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

const fetchCreateAdminAction = async (data) => {
  try {
    await instance.request({
      url: `/api/users`,
      method: "POST",
      data: { ...data, role: "ADMIN", skill: [], certification: [] },
    });

    return {
      type: "Chúc mừng!",
      content: "Tạo Admin thành công",
    };
  } catch (error) {
    const errorContent = error.response.data.content;
    return {
      type: "Có lỗi xảy ra!",
      content: errorContent,
    };
  }
};

const fetchDeleteUserById = (userId) => {
  return async (dispatch) => {
    try {
      await instance.request({
        url: `/api/users/?id=${userId}`,
        method: "DELETE",
      });

      await dispatch(fetchGetUserListPagination(""));

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

const fetchGetUserListPagination = (searchValue) => {
  return async (dispatch, getState) => {
    try {
      const pageConfig = getState().manageReducer.usersListPageConfig;
      const res = await instance.request({
        url: `/api/users/phan-trang-tim-kiem/?pageIndex=${pageConfig.pageIndex}&pageSize=${pageConfig.pageSize}&keyword=${searchValue}`,
      });

      const resData = res.data.content;

      dispatch(
        manageActionTypes.setUsersListPageConfig({
          pageIndex: resData.pageIndex,
          pageSize: resData.pageSize,
          totalRow: resData.totalRow,
        })
      );

      dispatch(manageActionTypes.setUserList(resData.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  manageActionTypes,
  fetchGetUserListPagination,
  fetchDeleteUserById,
  fetchCreateAdminAction,
  fetchUpdateUserAction,
};
