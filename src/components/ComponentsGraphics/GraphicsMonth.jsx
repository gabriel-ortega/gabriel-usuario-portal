import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
);

// Datos fijos
const months = [
  { month: "Enero", value: 65 },
  { month: "Febrero", value: 59 },
  { month: "Marzo", value: 80 },
  { month: "Abril", value: 81 },
  { month: "Mayo", value: 56 },
  { month: "Junio", value: 55 },
  { month: "Julio", value: 40 },
];

export default function GraphicsMonth() {
  const { dashboard } = useSelector((state) => state.currentViews);
  const [data, setData] = useState({
    labels: dashboard.applicationsByMonth?.map((item) =>
      item.month.toUpperCase()
    ),
    datasets: [
      {
        data: dashboard.applicationsByMonth?.map((item) => item.value),
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });
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
  useEffect(() => {
    const updateData = () => {
      console.log("first");
      const updatedValues = dashboard.applicationsByMonth?.map(
        (item) => item.value
      );

      setData((prevData) => ({
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
    <>
      {dashboard.applicationsByMonth && (
        <div className="w-full max-w-lg justify-center">
          <h2 className="font-semibold text-lg">Applications By Month</h2>
          <Line data={data} options={options} />
        </div>
      )}
    </>
  );
}
