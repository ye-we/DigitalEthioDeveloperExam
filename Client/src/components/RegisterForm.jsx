import { useState, React, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultipleSelect from "./forms/Selection/MultipleSelect";
import { departmentActions } from "../store/departmentSlice";
import DepartmentTreeSelect from "./forms/Selection/DepartmentTreeSelect";

const RegisterForm = () => {
  const departments = useSelector((state) => state.allDepartments.departments);
  const registerNotification = useSelector(
    (state) => state.allDepartments.registerNotification
  );
  // Dropdown inputs
  const [manages, setManages] = useState([]);
  const [managedBy, setManagedBy] = useState(undefined);
  // Input fields
  const name = useRef();
  const desc = useRef();

  const dispatch = useDispatch();
  // When the managedBy selection input changes
  const onManagedByChanged = (val) => {
    setManagedBy(val);
    console.log(val);
  };

  // When register form is submitted
  const submitHandler = (e) => {
    e.preventDefault();

    // Find the list of id of departments managed based on the text input(Chief Financial Officer, Auditors -> [1243sdsf21123, 123les13s3214])
    let managesId = [];
    departments.forEach((data) => {
      manages.forEach((mul) => {
        if (data.name === mul) {
          managesId.push(data.id);
        }
      });
    });

    // Find the id of the managerDep based on the text input (Chief Executive Officer -> 1234123ese232wfs331)
    const managerDep = departments.find((dep) => dep.name === managedBy);
    const manager = managerDep.id;

    const newDepartment = {
      name: name.current.value,
      desc: desc.current.value,
      manages: managesId,
      managedBy: manager,
    };

    // Http request to the backed based on the input
    const updateDepartment = async () => {
      const response = await fetch("/api/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDepartment),
      });
      console.log(response);
      if (!response.ok) {
        // If there was an error while fetching, throw that error to our catch block.
        const res = await response.json();

        throw new Error(res.message);
      }
      // If there was no error, dispatch a success message to the updateRegistrationNotification reducer.
      const res = await response.json();
      const successMessage = {
        title: "New department created.",
      };
      dispatch(departmentActions.updateRegisterNotification(successMessage));
      dispatch(departmentActions.addDepartment(res.data.data));

      // Update the tree structure
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
    };

    updateDepartment().catch((err) => {
      // catch the error and  dispatch an error message to the updateRegistrationNotification reducer.
      const error = {
        title: "Failure to Create new Department",
        message: err.message,
      };
      dispatch(departmentActions.updateRegisterNotification(error));
    });

    // If there was no error add a new user to our store.
    dispatch(departmentActions.updateDepartments(newDepartment));
  };

  const registerHandler = (multiData) => {
    setManages(multiData);
  };

  return (
    <>
      <h1 className="mb-5 text-4xl">Register New Department</h1>
      <form
        className="flex-col   w-[80%] md:w-[41%] md:h-[50%] h-[50%]"
        onSubmit={submitHandler}
      >
        <input
          placeholder="name"
          ref={name}
          className="mb-4 h-[40px] rounded-lg p-2 focus:outline-none"
        />
        <textarea
          placeholder="description"
          className="block w-[400px] rounded-lg p-2 mb-4 focus:outline-none"
          ref={desc}
        />
        <div className="w-[400px] h-[40px] mb-2">
          <MultipleSelect onRegister={registerHandler} />
        </div>
        <div className="w-[400px] h-[40px] mb-2">
          <DepartmentTreeSelect
            register={true}
            managedUpdate={onManagedByChanged}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-[150px] rounded-lg p-2 border-r-6"
        >
          Register
        </button>
      </form>
      {registerNotification && (
        <div>
          <h1>{registerNotification.title}</h1>
          <p>{registerNotification?.message}</p>
        </div>
      )}
    </>
  );
};
export default RegisterForm;
