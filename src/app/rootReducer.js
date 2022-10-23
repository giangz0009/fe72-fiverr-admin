import authReducer from "features/auth/authSlice";
import jobsReducer from "features/jobs/jobsSlice";
import jobTypeDetailsReducer from "features/jobTypeDetails/jobTypeDetailsSlice";
import jobTypesReducer from "features/jobTypes/jobTypesSlice";
import manageReducer from "features/manage/manageSlice";
import serviceReducer from "features/service/serviceSlice";

const rootReducer = {
  authReducer: authReducer,
  manageReducer: manageReducer,
  jobsReducer: jobsReducer,
  jobTypesReducer: jobTypesReducer,
  jobTypeDetailsReducer: jobTypeDetailsReducer,
  serviceReducer: serviceReducer,
};

export default rootReducer;
