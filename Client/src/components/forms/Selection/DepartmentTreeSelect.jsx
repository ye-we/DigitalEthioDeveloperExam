import { React } from "react";
import { useSelector } from "react-redux";
import { TreeSelect } from "antd";
import { useNavigate } from "react-router-dom";

const DepartmentTreeSelect = (props) => {
  let treeData = [];
  const tree = useSelector((state) => state.allDepartments.tree);
  treeData[0] = tree;
  console.log(tree);
  const navigate = useNavigate();

  const oldDepartmentSelector = (val) => {
    if (props.search) navigate(`/departments/${val}`);
    if (props.register) {
      props.managedUpdate(val);
    }
    if (props.update) {
      props.updateManaged(val);
    }
    if (props.oldName) {
      props.updateOldName(val);
    }
  };
  return (
    <TreeSelect
      showSearch
      style={{
        width: "100%",
        alignSelf: "left",
        marginBottom: "20px",
      }}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder={props.label ? props.label : "Managed by"}
      allowClear
      treeDefaultExpandAll
      onChange={oldDepartmentSelector}
      treeData={!tree ? tree : treeData}
    />
  );
};

export default DepartmentTreeSelect;
