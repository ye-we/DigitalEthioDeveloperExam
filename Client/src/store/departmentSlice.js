import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
  newDepartment: null,
  registerNotification: null,
  updateNotification: null,
  tree: null,
};

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    // Update the list of departments
    setDepartments(state, action) {
      const departments = action.payload;
      console.log(departments);
      state.departments = departments;
    },
    updateDepartments(state, action) {
      // Update one department when we updated it in the database
      const newDepartment = action.payload;
      console.log(newDepartment);
      const departments = current(state).departments;
      const newDepartmentList = departments.map((dep) =>
        dep.name === newDepartment.oldName ? newDepartment : dep
      );
      state.departments = newDepartmentList;
    },
    addDepartment(state, action) {
      const newDepartment = action.payload;
      state.departments.push(newDepartment);
    },
    setTree(state, action) {
      // Update the department tree(hierarchy)
      const tree = action.payload;
      state.tree = tree;
    },
    updateRegisterNotification(state, action) {
      // update the register notification
      const notification = action.payload;
      console.log(notification);
      state.registerNotification = notification;
    },
  },
});

export const departmentActions = departmentSlice.actions;

export default departmentSlice;
