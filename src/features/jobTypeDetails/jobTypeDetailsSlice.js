import { jobTypeDetailsActionTypes } from "./jobTypeDetailsAction";

const { createReducer } = require("@reduxjs/toolkit");

const initialSlice = {
  jobTypeDetailsList: null,
  jobTypeDetailsListPageConfig: {
    pageIndex: 1,
    pageSize: 10,
  },
  jobTypeDetailsListCRUDStatus: "read",
  jobTypeDetailUpdateIndex: null,
  jobTypeDetailsMenu: null,
};

const jobTypeDetailsReducer = createReducer(initialSlice, (builder) => {
  builder
    .addCase(
      jobTypeDetailsActionTypes.setJobTypeDetailsMenu,
      (state, action) => {
        state.jobTypeDetailsMenu = action.payload;
      }
    )
    .addCase(
      jobTypeDetailsActionTypes.setJobTypeDetailUpdateIndex,
      (state, action) => {
        state.jobTypeDetailUpdateIndex = action.payload;
      }
    )
    .addCase(
      jobTypeDetailsActionTypes.setJobTypeDetailsListCRUDStatus,
      (state, action) => {
        state.jobTypeDetailsListCRUDStatus = action.payload;
      }
    )
    .addCase(
      jobTypeDetailsActionTypes.setJobTypeDetailsListPageIndex,
      (state, action) => {
        state.jobTypeDetailsListPageConfig = {
          ...state.jobTypeDetailsListPageConfig,
          pageIndex: action.payload,
        };
      }
    )
    .addCase(
      jobTypeDetailsActionTypes.setJobTypeDetailsListPageSize,
      (state, action) => {
        state.jobTypeDetailsListPageConfig = {
          ...state.jobTypeDetailsListPageConfig,
          pageSize: action.payload,
        };
      }
    )
    .addCase(
      jobTypeDetailsActionTypes.setJobTypeDetailsListPageConfig,
      (state, action) => {
        state.jobTypeDetailsListPageConfig = action.payload;
      }
    )
    .addCase(
      jobTypeDetailsActionTypes.setJobTypeDetailsList,
      (state, action) => {
        state.jobTypeDetailsList = action.payload;
      }
    )
    .addDefaultCase((state, action) => {
      state.otherActions++;
    });
});

export default jobTypeDetailsReducer;
