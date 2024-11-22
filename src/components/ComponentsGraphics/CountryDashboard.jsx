import React from "react";
import TableDashboard from "./TableDashboard";
import { useEffect } from "react";
import { useState } from "react";

export default function CountryDashboard() {
  const [data, setData] = useState([
    { name: "Panama", count: 950 },
    { name: "Peru", count: 20 },
    { name: "Argentina", count: 30 },
    { name: "China", count: 80 },
    { name: "Guyana", count: 20 },
    { name: "Haiti", count: 70 },
    { name: "Panama", count: 950 },
    { name: "Peru", count: 20 },
    { name: "Argentina", count: 30 },
    { name: "China", count: 80 },
    { name: "Guyana", count: 20 },
    { name: "Haiti", count: 70 },
    { name: "Panama", count: 950 },
    { name: "Peru", count: 20 },
    { name: "Argentina", count: 30 },
    { name: "China", count: 80 },
    { name: "Guyana", count: 20 },
    { name: "Haiti", count: 70 },
    { name: "Panama", count: 950 },
    { name: "Peru", count: 20 },
    { name: "Argentina", count: 30 },
    { name: "China", count: 80 },
    { name: "Guyana", count: 20 },
    { name: "Haiti", count: 70 },
    { name: "Panama", count: 950 },
    { name: "Peru", count: 20 },
    { name: "Argentina", count: 30 },
    { name: "China", count: 80 },
    { name: "Guyana", count: 20 },
    { name: "Haiti", count: 70 },
    { name: "Panama", count: 950 },
    { name: "Peru", count: 20 },
    { name: "Argentina", count: 30 },
    { name: "China", count: 80 },
    { name: "Guyana", count: 20 },
    { name: "Haiti", count: 70 },
    { name: "Panama", count: 950 },
    { name: "Peru", count: 20 },
    { name: "Argentina", count: 30 },
    { name: "China", count: 80 },
    { name: "Guyana", count: 20 },
    { name: "Haiti", count: 70 },
    { name: "Panama", count: 950 },
    { name: "Peru", count: 20 },
    { name: "Argentina", count: 30 },
    { name: "China", count: 80 },
    { name: "Guyana", count: 20 },
    { name: "Haiti", count: 70 },
    { name: "Panama", count: 950 },
    { name: "Peru", count: 20 },
    { name: "Argentina", count: 30 },
    { name: "China", count: 80 },
    { name: "Guyana", count: 20 },
    { name: "Haiti", count: 70 },
    { name: "Panama", count: 950 },
    { name: "Peru", count: 20 },
    { name: "Argentina", count: 30 },
    { name: "China", count: 80 },
    { name: "Guyana", count: 20 },
    { name: "Haiti", count: 70 },
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
      <h1 className="text-lg font-medium mb-4">Applicants By Country</h1>
      <div className="overflow-y-auto h-52">
        <TableDashboard
          data={data}
          encabezado1="Country"
          encabezado2="Applicant Count"
        />
      </div>
    </div>
  );
}
