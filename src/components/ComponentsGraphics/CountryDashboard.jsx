import React from "react";
import TableDashboard from "./TableDashboard";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getCountry } from "../../util/services";

export default function CountryDashboard() {
  const loadCountries = async () => {
    setCountries(await getCountry());
  };
  const { dashboard } = useSelector((state) => state.currentViews);
  const [countries, setCountries] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      dashboard?.nationalities
        ?.map((item) => ({
          name:
            countries?.find((pos) => pos.Id == item.name)?.CountryName || "N/A",
          count: item.count,
        }))
        .sort((a, b) => b.count - a.count)
    );
  }, [countries]);

  useEffect(() => {
    loadCountries();
  }, []);

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
