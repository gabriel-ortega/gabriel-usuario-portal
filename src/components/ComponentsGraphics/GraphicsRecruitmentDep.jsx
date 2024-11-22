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
  { dep: "Cruise Department", value: 700 },
  { dep: "Merchant Department", value: 500 },
];

export default function GraphicsRecruitmentDep() {
  const [departmentData, setDepartmentData] = useState({
    labels: depData.map((item) => item.dep),
    datasets: [
      {
        data: depData.map((item) => item.value),
        backgroundColor: ["rgba(59, 130, 246, 0.8)", "#F58A07"],
      },
    ],
  });

  useEffect(() => {
    const updateData = () => {
      const updatedValues = depData.map((item) => item.value);

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
  }, []);

  return (
    <section>
      <div className="w-full max-w-lg justify-center">
        {" "}
        <h2 className="font-semibold text-lg ">
          Applications By Recruitment Department
        </h2>
        <Bar options={options} data={departmentData} />
      </div>
    </section>
  );
}
