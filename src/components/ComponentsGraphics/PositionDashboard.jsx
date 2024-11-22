import React from "react";
import TableDashboard from "./TableDashboard";
import { useEffect } from "react";
import { useState } from "react";

export default function PositionDashboard() {
  const [data, setData] = useState([
    { name: "2nd Purser Administrator", count: 10 },
    { name: "3nd purser payroll", count: 20 },
    { name: "Able Seaman", count: 30 },
  ]);

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
      <h1 className="text-lg font-medium mb-4">Applicants By Position</h1>
      <div className="overflow-y-auto h-52">
        <TableDashboard
          data={data}
          encabezado1="Position"
          encabezado2="Applicant Count"
        />
      </div>
    </div>
  );
}
