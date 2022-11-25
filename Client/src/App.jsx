import { React, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./layouts/Sidebar";
import Departments from "./pages/Departments";
import RegisterDepartment from "./pages/RegisterDepartment";
import UpdateDepartment from "./pages/UpdateDepartment";
import DepartmentDetail from "./pages/DepartmentDetail";
import { useDispatch, useSelector } from "react-redux";
import { departmentActions } from "./store/departmentSlice";
let initial = true;
let treeData = [];

const App = () => {
  // Initialize our store
  const dispatch = useDispatch();
  const tree = useSelector((state) => state.allDepartments.tree);
  if (tree) {
    treeData[0] = tree;
  }
  console.log(tree);
  useEffect(() => {
    if (initial) {
      // Fetch all the departments to generate the table
      const fetchDepartments = async () => {
        const response = await fetch("/api/departments", {
          method: "GET",
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Fetching Departments Failed");
        }

        const res = await response.json();
        const departments = res.data.data;
        dispatch(departmentActions.setDepartments(departments));
      };
      fetchDepartments().catch((err) => {
        console.log(err);
      });

      // Fetch the ceo to help with the department tree
      const fetchCEO = async () => {
        const response = await fetch("/api/departments/tree", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Fetching CEO Failed");
        }
        const res = await response.json();
        console.log(res);

        const treeResult = res.data.data;

        dispatch(departmentActions.setTree(treeResult));
      };
      fetchCEO().catch((err) => {
        console.log(err);
      });

      initial = false;
    }
  }, []);

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="h-[100vh] flex-1 flex items-center justify-center pb-40">
        <Routes>
          <Route path="/" element={<Departments />} />
          <Route
            path="/departments/:departmentId"
            element={<DepartmentDetail />}
          />
          <Route path="/register" element={<RegisterDepartment />} />
          <Route path="/update" element={<UpdateDepartment />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
