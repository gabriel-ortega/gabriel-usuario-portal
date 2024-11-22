import React from "react";
import TableDashboard from "./TableDashboard";
import { useEffect } from "react";
import { useState } from "react";

export default function HarvesterDashboard() {
  const [data, setData] = useState([
    { name: "Bernardo Bustillo", count: 50 },
    { name: "Actividad Externa", count: 120 },
    { name: "JG Maritime Agency", count: 80 },
    { name: "Logistics", count: 60 },
    { name: "N/A", count: 710 },
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
      <h1 className="text-lg font-medium mb-4">Applicants By Harvester</h1>
      <div className="overflow-y-auto h-52">
        <TableDashboard
          data={data}
          encabezado1="Harvester"
          encabezado2="Applicant Count"
        />
      </div>
    </div>
  );
}
