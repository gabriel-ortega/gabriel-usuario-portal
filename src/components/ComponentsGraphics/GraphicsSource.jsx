import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const source = [
  { label: "E-mail", value: 300 },
  { label: "Facebook", value: 500 },
  { label: "Instagram", value: 100 },
  { label: "Mitradel", value: 700 },
  { label: "WhatsApp", value: 600 },
  { label: "Otros", value: 400 },
];

const initialData = {
  labels: source.map((item) => item.label),
  datasets: [
    {
      data: source.map((item) => item.value),
      backgroundColor: [
        "#A22C29",
        "#006BD1",
        "#84E296",
        "#F1BF98",
        "#843B62",
        "#78E3FD",
      ],
    },
  ],
};

export default function GraphicsSource() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const updateData = () => {
      const updatedValues = source.map((item) => item.value);
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
  }, []);

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "left",
        align: "start",
        labels: {
          color: "#333",
          font: {
            size: 12,
            family: "Arial",
          },
          padding: 10,
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <section>
      <div className="lg:w-96 md:w-96 sm:w-64 h-96">
        <h2 className="font-semibold text-lg">Applications By Source</h2>
        <Pie options={doughnutOptions} data={data} />
      </div>
    </section>
  );
}
