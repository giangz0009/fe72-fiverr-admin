import { jobTypesActionTypes } from "./jobTypesAction";

const { createReducer } = require("@reduxjs/toolkit");

const initialSlice = {
  jobTypesList: null,
  jobTypesListPageConfig: {
    pageIndex: 1,
    pageSize: 10,
  },
  jobTypesListCRUDStatus: "read",
  jobTypeUpdateIndex: null,
};

const jobTypesReducer = createReducer(initialSlice, (builder) => {
  builder
    .addCase(jobTypesActionTypes.setJobTypeUpdateIndex, (state, action) => {
      state.jobTypeUpdateIndex = action.payload;
    })
    .addCase(jobTypesActionTypes.setJobTypesListCRUDStatus, (state, action) => {
      state.jobTypesListCRUDStatus = action.payload;
    })
    .addCase(jobTypesActionTypes.setJobTypesListPageIndex, (state, action) => {
      state.jobTypesListPageConfig = {
        ...state.jobTypesListPageConfig,
        pageIndex: action.payload,
      };
    })
    .addCase(jobTypesActionTypes.setJobTypesListPageSize, (state, action) => {
      state.jobTypesListPageConfig = {
        ...state.jobTypesListPageConfig,
        pageSize: action.payload,
      };
    })
    .addCase(jobTypesActionTypes.setJobTypesListPageConfig, (state, action) => {
      state.jobTypesListPageConfig = action.payload;
    })
    .addCase(jobTypesActionTypes.setJobTypesList, (state, action) => {
      state.jobTypesList = action.payload;
    })
    .addDefaultCase((state, action) => {
      state.otherActions++;
    });
});

export default jobTypesReducer;
