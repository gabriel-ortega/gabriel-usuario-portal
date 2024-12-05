import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Opciones para la gráfica de barras
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: false,
    },
    title: {
      display: true,
    },
  },
};

// Datos iniciales
const depData = [
  { name: "Cruise Department", count: 700 },
  { name: "Merchant Department", count: 500 },
];

export default function GraphicsRecruitmentDep() {
  const { dashboard, vesselTypes } = useSelector((state) => state.currentViews);
  const [departmentData, setDepartmentData] = useState({
    labels: dashboard.recDepts?.map(
      (item) => vesselTypes?.find((type) => type.Id == item.name)?.Name
    ),
    datasets: [
      {
        data: dashboard.recDepts?.map((item) => item.count),
        backgroundColor: ["rgba(59, 130, 246, 0.8)", "#F58A07"],
      },
    ],
  });

  useEffect(() => {
    const updateData = () => {
      const updatedValues = dashboard.recDepts?.map((item) => item.count);

      setDepartmentData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: updatedValues,
          },
        ],
      }));
    };

    const interval = setInterval(updateData, 3000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [dashboard]);

  return (
    <section>
      <div className="w-full max-w-lg justify-center">
        <h2 className="font-semibold text-lg ">
          Applications By Recruitment Department
        </h2>
        <Bar options={options} data={departmentData} />
      </div>
    </section>
  );
}
