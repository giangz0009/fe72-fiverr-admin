const { createAction } = require("@reduxjs/toolkit");
const { default: instance } = require("app/instance");

const authActionTypes = {
  setAuthProfile: createAction("Auth/SET_AUTH_PROFILE"),
  setLoginConfirm: createAction("Auth/SET_LOGIN_CONFIRM"),
  setCrudStatus: createAction("Auth/SET_CRUD_STATUS"),
};

const fetchUploadImageAction = (data) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: `/api/users/upload-avatar`,
        method: "POST",
        data: data,
      });

      dispatch(fetchSetAuthProfileAction(res.data.content));

      return {
        type: "Success",
        content: "Đăng ảnh thành công!",
      };
    } catch (error) {
      return {
        type: "Error",
        content: "Có lỗi xải ra!",
      };
    }
  };
};

const fetchUpdateAdminProfileAction = (data) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: `/api/users/${data.id}`,
        method: "PUT",
        data: data,
      });

      const customRes = {
        ...res.data.content,
        skill: JSON.parse(res.data.content.skill),
        certification: JSON.parse(res.data.content.certification),
      };

      dispatch(authActionTypes.setAuthProfile(customRes));

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

const fetchSetAuthProfileAction = (data) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/auth/signin",
        method: "POST",
        data: data,
      });

      const resDataContent = res.data.content;
      const role = resDataContent.user.role;

      if (role === "ADMIN") {
        const authProfile = {
          id: resDataContent.user.id,
          token: resDataContent.token,
        };
        const authProfileToString = JSON.stringify(authProfile);

        localStorage.setItem("authProfile", authProfileToString);

        dispatch(authActionTypes.setAuthProfile(resDataContent.user));

        dispatch(
          authActionTypes.setLoginConfirm({
            type: "Congratulation",
            content: "Login Success!",
          })
        );

        return {
          type: "Success",
          content: "Login Success!",
        };
      } else {
        return {
          type: "Notification",
          content: "You do not have permission to login to this site!",
        };
      }
    } catch (error) {
      return {
        type: "Error",
        content: error.response.data.content,
      };
    }
  };
};

const fetchSetAuthProfileByIdAction = (authId) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: `/api/users/${authId}`,
        method: "GET",
      });

      dispatch(authActionTypes.setAuthProfile(res.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  authActionTypes,
  fetchSetAuthProfileAction,
  fetchSetAuthProfileByIdAction,
  fetchUpdateAdminProfileAction,
  fetchUploadImageAction,
};
