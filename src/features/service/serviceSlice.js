import { servicesActionTypes } from "./serviceAction";

const { createReducer } = require("@reduxjs/toolkit");

const initialSlice = {
  servicesList: null,
  servicesListPageConfig: {
    pageIndex: 1,
    pageSize: 10,
  },
  servicesListCRUDStatus: "read",
  serviceUpdateIndex: null,
  serviceUsersList: null,
  serviceJobsList: null,
};

const serviceReducer = createReducer(initialSlice, (builder) => {
  builder
    .addCase(servicesActionTypes.setServiceJobsList, (state, action) => {
      state.serviceJobsList = action.payload;
    })
    .addCase(servicesActionTypes.setServiceUsersList, (state, action) => {
      state.serviceUsersList = action.payload;
    })
    .addCase(servicesActionTypes.setServiceUpdateIndex, (state, action) => {
      state.serviceUpdateIndex = action.payload;
    })
    .addCase(servicesActionTypes.setServicesListCRUDStatus, (state, action) => {
      state.servicesListCRUDStatus = action.payload;
    })
    .addCase(servicesActionTypes.setServicesListPageIndex, (state, action) => {
      state.servicesListPageConfig = {
        ...state.servicesListPageConfig,
        pageIndex: action.payload,
      };
    })
    .addCase(servicesActionTypes.setServicesListPageSize, (state, action) => {
      state.servicesListPageConfig = {
        ...state.servicesListPageConfig,
        pageSize: action.payload,
      };
    })
    .addCase(servicesActionTypes.setServicesListPageConfig, (state, action) => {
      state.servicesListPageConfig = action.payload;
    })
    .addCase(servicesActionTypes.setServicesList, (state, action) => {
      state.servicesList = action.payload;
    })
    .addDefaultCase((state, action) => {
      state.otherActions++;
    });
});

export default serviceReducer;
