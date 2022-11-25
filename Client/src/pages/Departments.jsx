import React from "react";
import DepartmentTreeSelect from "../components/forms/Selection/DepartmentTreeSelect";
import Card from "../components/UI/Card";

const Departments = () => {
  return (
    <Card>
      <div className="flex flex-col justify-between">
        <h1 className="m-5 font text-4xl text-center">Departments</h1>
        <div className="m-5 w-[400px]">
          <DepartmentTreeSelect
            label={"Click To See Departments"}
            search={true}
          />
        </div>
      </div>
      <div className="flex flex-col items-center"></div>
    </Card>
  );
};
export default Departments;
