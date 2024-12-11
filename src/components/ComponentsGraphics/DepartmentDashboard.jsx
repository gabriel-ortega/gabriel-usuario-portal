import React from "react";
import TableDashboard from "./TableDashboard";
import { useEffect } from "react";
import { useState } from "react";
import { LoadingState } from "../skeleton/LoadingState";
import { useSelector } from "react-redux";

export default function DepartmentDashboard() {
  const { dashboard, departments } = useSelector((state) => state.currentViews);
  const [data, setData] = useState(
    dashboard?.departments
      ?.map((item) => ({
        name:
          departments?.find((pos) => pos.Id == item.name)?.DepartmentName ||
          "N/A",
        count: item.count,
      }))
      .sort((a, b) => b.count - a.count)
  );

  useEffect(() => {
    setData(
      dashboard?.departments
        ?.map((item) => ({
          name:
            departments?.find((pos) => pos.Id == item.name)?.DepartmentName ||
            "N/A",
          count: item.count,
        }))
        .sort((a, b) => b.count - a.count)
    );
  }, [departments]);

  /*   // Función para actualizar cualquier campo de un proceso
  const updateProcessData = (processName, field, newValue) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.process === processName ? { ...item, [field]: newValue } : item
      )
    );
  }; */

  return (
    <div className="w-full ">
      <h1 className="text-lg font-medium mb-4">Applicants By Department</h1>
      <div className="overflow-y-auto h-52">
        {!departments ? (
          <LoadingState />
        ) : (
          <TableDashboard
            data={data}
            encabezado1="Department"
            encabezado2="Applicant Count"
          />
        )}
      </div>
    </div>
  );
}
