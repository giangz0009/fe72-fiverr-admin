import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "app/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "features/auth/pages/SignIn";
import Manage from "features/manage/pages/Manage";
import User from "features/manage/common/components/User";
import Job from "features/jobs/pages/Job";
import JobTypes from "features/jobTypes/pages/JobTypes";
import JobTypeDetails from "features/jobTypeDetails/pages/JobTypeDetails";
import Service from "features/service/pages/Service";
import Profile from "features/auth/pages/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<SignIn />} />
            <Route path="manage/" element={<Manage />}>
              <Route
                index
                element={
                  <p style={{ fontSize: 20, marginTop: 48, fontWeight: 600 }}>
                    Vui lòng chọn danh mục muốn quản lý
                  </p>
                }
              />
              <Route path="user" element={<User />} />
              <Route path="jobs" element={<Job />} />
              <Route path="jobTypes" element={<JobTypes />} />
              <Route path="jobTypeDetails" element={<JobTypeDetails />} />
              <Route path="service" element={<Service />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
