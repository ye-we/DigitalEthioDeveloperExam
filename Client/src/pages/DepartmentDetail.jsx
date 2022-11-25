import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../components/UI/Card";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const DepartmentDetail = () => {
  let { departmentId } = useParams();
  let managed = [];
  const departments = useSelector((state) => state.allDepartments.departments);

  const currentDepartment = departments.find(
    (dep) => dep.name === departmentId
  );
  const manages = currentDepartment.manages;
  const manager = departments.find(
    (dep) => dep._id === currentDepartment?.managedBy
  );
  departments.forEach((dep, i) => {
    if (manages.includes(dep._id)) {
      managed.push({
        label: <Link to={`/departments/${dep.name}`}>{dep.name}</Link>,
        key: { i },
      });
    }
  });
  console.log(managed);
  const managerItem = [
    {
      label: (
        <Link to={`/departments/${manager?.name}`}>
          {manager?.name ? manager.name : "/"}
        </Link>
      ),
      key: "0",
    },
  ];

  console.log(currentDepartment);
  console.log(departmentId);

  return (
    <Card>
      <h1 className="text-4xl mb-4">{currentDepartment.name}</h1>
      <div className="mb-4">{currentDepartment.desc}</div>
      <div className="flex w-[300px] justify-around">
        {manager && (
          <Dropdown
            menu={{
              items: managerItem,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <h2 className="text-lg text-blue-400 cursor-pointer">
                  Manager
                </h2>
                <DownOutlined className="mb-1 text-blue-400 cursor-pointer" />
              </Space>
            </a>
          </Dropdown>
        )}
        {managed && (
          <Dropdown
            menu={{
              items: managed,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <h2 className="text-lg text-blue-400 cursor-pointer">
                  Managed
                </h2>
                <DownOutlined className="mb-1 text-blue-400 cursor-pointer" />
              </Space>
            </a>
          </Dropdown>
        )}
      </div>
    </Card>
  );
};

export default DepartmentDetail;
