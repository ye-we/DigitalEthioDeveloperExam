import { configureStore } from "@reduxjs/toolkit";
import departmentSlice from "./departmentSlice";

const store = configureStore({
  reducer: { allDepartments: departmentSlice.reducer },
});

export const departmentActions = departmentSlice.actions;

export default store;
