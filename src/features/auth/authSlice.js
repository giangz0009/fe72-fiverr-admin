const { createReducer } = require("@reduxjs/toolkit");
const { authActionTypes } = require("./action");

const initialSlice = {
  authProfile: null,
  loginConfirm: null,
  crudStatus: "read",
};

const authReducer = createReducer(initialSlice, (builder) => {
  builder
    .addCase(authActionTypes.setCrudStatus, (state, action) => {
      state.crudStatus = action.payload;
    })
    .addCase(authActionTypes.setLoginConfirm, (state, action) => {
      state.loginConfirm = action.payload;
    })
    .addCase(authActionTypes.setAuthProfile, (state, action) => {
      state.authProfile = action.payload;
    })
    .addDefaultCase((state, action) => {
      state.otherActions++;
    });
});

export default authReducer;
