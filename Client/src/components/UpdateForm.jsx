import { useState, React, useRef } from "react";
import { TreeSelect } from "antd";
import { useDispatch } from "react-redux";
import MultipleSelection from "./forms/Selection/MultipleSelect";
import { departmentActions } from "../store/departmentSlice";
import { useSelector } from "react-redux";
import DepartmentTreeSelect from "./forms/Selection/DepartmentTreeSelect";

let treeData = [];

const UpdateForm = () => {
  const departments = useSelector((state) => state.allDepartments.departments);

  const [oldName, setOldName] = useState(undefined);
  const [manages, setManages] = useState(undefined);
  const [managedByDisplay, setManagedByDisplay] = useState(undefined);
  const [managedBy, setManagedBy] = useState(undefined);
  const name = useRef();
  const desc = useRef();

  const dispatch = useDispatch();

  const onManagedByChanged = (val) => {
    setManagedBy(val);
    // Fill the input fields based on the department selected
    // const currentDep = departments.find((dep) => dep.name === val);
    // name.current.value = currentDep.name;
    // desc.current.value = currentDep.desc;
    // const managedBy = departments.find(
    //   (dep) => dep._id === currentDep?.managedBy
    // );
    // setManagedByDisplay(managedBy?.name || "-");
  };
  const onOldNameChanged = (val) => {
    setOldName(val);
  };

  // Whenever there's a change in the manages field
  const registerHandler = (multiData) => {
    // Find the list of id of departments managed based on the text input(Chief Financial Officer, Auditors -> [1243sdsf21123, 123les13s3214])
    let managesId = [];
    departments.forEach((data) => {
      multiData.forEach((mul) => {
        console.log(mul);
        if (data.name === mul) {
          managesId.push(data.id);
        }
      });
    });
    setManages(managesId);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(managedBy);

    // Find the id of the managerDep based on the text input (Chief Executive Officer -> 1234123ese232wfs331)
    const managerDep = departments.find((dep) => dep.name === managedBy);
    const manager = managerDep?.id;

    const newDepartment = {
      oldName,
      name: name.current.value,
      desc: desc.current.value,
      manages,
      managedBy: manager,
    };

    console.log(newDepartment);
    const updateDepartment = async () => {
      const response = await fetch(`/api/departments`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDepartment),
      });
      const res = await response.json();
      if (res) {
        console.log(res);
        dispatch(
          departmentActions.updateDepartments({
            ...res.data.data,
            oldName: newDepartment.oldName,
          })
        );
      }
    };
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
    updateDepartment().catch((err) => console.log(err));
  };

  return (
    <>
      <h1 className="mb-5 text-4xl">Update Departments</h1>

      <form
        className="flex-col   w-[80%] md:w-[35%] md:h-[50%] h-[50%]"
        onSubmit={submitHandler}
      >
        <div className="w-[400px] h-[40px] mb-2">
          <DepartmentTreeSelect
            label={"Old Name"}
            oldName={true}
            updateOldName={onOldNameChanged}
          />
        </div>

        <input
          placeholder="New Name"
          ref={name}
          className="mb-4 h-[40px] rounded-lg p-2 focus:outline-none"
        />

        <textarea
          placeholder="description"
          className="block w-[400px] rounded-lg p-2 mb-4 focus:outline-none"
          ref={desc}
        />
        <div className="w-[400px] h-[40px] mb-2">
          <MultipleSelection onRegister={registerHandler} />
        </div>

        <div className="w-[400px] h-[40px] mb-2">
          <DepartmentTreeSelect
            update={true}
            updateManaged={onManagedByChanged}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white w-[150px] rounded-lg p-2 border-r-6"
        >
          Update
        </button>
      </form>
    </>
  );
};
export default UpdateForm;
