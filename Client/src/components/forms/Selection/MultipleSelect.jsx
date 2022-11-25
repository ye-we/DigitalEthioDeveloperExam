import React, { useState } from "react";
import { TreeSelect } from "antd";
import { useSelector } from "react-redux";

let treeData = [];

const MultipleSelect = (props) => {
  const tree = useSelector((state) => state.allDepartments.tree);
  if (tree) {
    treeData[0] = tree;
  }
  const [value, setValue] = useState([]);
  const onChange = (newValue) => {
    setValue(newValue);
    props.onRegister(newValue);
  };
  const tProps = {
    value,
    onChange,
    treeCheckable: true,
    placeholder: "Manages",
    style: {
      width: "100%",
      height: "40px",
    },
  };
  return <TreeSelect {...tProps} treeData={!tree ? tree : treeData} />;
};
export default MultipleSelect;
