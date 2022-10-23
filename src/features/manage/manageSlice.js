import { manageActionTypes } from "./action";

const { createReducer } = require("@reduxjs/toolkit");

const initialSlice = {
  usersList: null,
  usersListPageConfig: {
    pageIndex: 1,
    pageSize: 10,
  },
  usersListCRUDStatus: "read",
  userUpdateIndex: null,
};

const manageReducer = createReducer(initialSlice, (builder) => {
  builder
    .addCase(manageActionTypes.setUserUpdateIndex, (state, action) => {
      state.userUpdateIndex = action.payload;
    })
    .addCase(manageActionTypes.setUsersListCRUDStatus, (state, action) => {
      state.usersListCRUDStatus = action.payload;
    })
    .addCase(manageActionTypes.setUsersListPageIndex, (state, action) => {
      state.usersListPageConfig = {
        ...state.usersListPageConfig,
        pageIndex: action.payload,
      };
    })
    .addCase(manageActionTypes.setUsersListPageSize, (state, action) => {
      state.usersListPageConfig = {
        ...state.usersListPageConfig,
        pageSize: action.payload,
      };
    })
    .addCase(manageActionTypes.setUsersListPageConfig, (state, action) => {
      state.usersListPageConfig = action.payload;
    })
    .addCase(manageActionTypes.setUserList, (state, action) => {
      state.usersList = action.payload;
    })
    .addDefaultCase((state, action) => {
      state.otherActions++;
    });
});

export default manageReducer;
