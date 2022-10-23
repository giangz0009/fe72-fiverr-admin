import { jobsActionTypes } from "./jobsAction";

const { createReducer } = require("@reduxjs/toolkit");

const initialSlice = {
  jobsList: null,
  jobsListPageConfig: {
    pageIndex: 1,
    pageSize: 10,
  },
  jobsListCRUDStatus: "read",
  jobUpdateIndex: null,
  jobTypeMenu: null,
};

const jobsReducer = createReducer(initialSlice, (builder) => {
  builder
    .addCase(jobsActionTypes.setJobTypeMenu, (state, action) => {
      state.jobTypeMenu = action.payload;
    })
    .addCase(jobsActionTypes.setJobUpdateIndex, (state, action) => {
      state.jobUpdateIndex = action.payload;
    })
    .addCase(jobsActionTypes.setJobsListCRUDStatus, (state, action) => {
      state.jobsListCRUDStatus = action.payload;
    })
    .addCase(jobsActionTypes.setJobsListPageIndex, (state, action) => {
      state.jobsListPageConfig = {
        ...state.jobsListPageConfig,
        pageIndex: action.payload,
      };
    })
    .addCase(jobsActionTypes.setJobsListPageSize, (state, action) => {
      state.jobsListPageConfig = {
        ...state.jobsListPageConfig,
        pageSize: action.payload,
      };
    })
    .addCase(jobsActionTypes.setJobsListPageConfig, (state, action) => {
      state.jobsListPageConfig = action.payload;
    })
    .addCase(jobsActionTypes.setJobsList, (state, action) => {
      state.jobsList = action.payload;
    })
    .addDefaultCase((state, action) => {
      state.otherActions++;
    });
});

export default jobsReducer;
