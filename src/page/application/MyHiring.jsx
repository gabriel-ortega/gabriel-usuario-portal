import { Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";

import { HiArrowLeft, HiDotsVertical } from "react-icons/hi";

import { useDispatch } from "react-redux";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getSeafarerHirings } from "../../store/userData";
import { useState } from "react";
import notFound from "../../assets/imagenes/notFound.gif";
/*  yinia puedes borrar desde aqui .... */
import { Bar, Doughnut } from "react-chartjs-2";
import {
  getProfileUpdate,
  getSeafarerData,
  setUserData,
  submitProfileUpdate,
} from "../../store/userData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import D3Funnel from "d3-funnel";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Gráfica de Barras",
    },
  },
};

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Gráfica Redonda (Doughnut)",
    },
  },
};

const data = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
  datasets: [
    {
      label: "Ventas",
      data: [300, 500, 100, 700, 600, 400],
      backgroundColor: [
        "rgba(59, 130, 246, 0.8)", // Azul
        "rgba(34, 197, 94, 0.8)", // Verde
        "rgba(234, 179, 8, 0.8)", // Amarillo
        "rgba(239, 68, 68, 0.8)", // Rojo
        "rgba(139, 92, 246, 0.8)", // Púrpura
        "rgba(16, 185, 129, 0.8)", // Verde Oscuro
      ],
    },
  ],
};

// Datos para la gráfica de embudo
const funnelData = [
  ["Enero", 300],
  ["Febrero", 500],
  ["Marzo", 100],
  ["Abril", 700],
  ["Mayo", 600],
  ["Junio", 400],
];

/* hasta aqui, pero cuidado borras mas  */
export default function MyHiring() {
  const dispatch = useDispatch();
  const { userData, isSaving } = useSelector((state) => state.userData);
  const { hirings, profile } = useSelector((state) => state.currentViews); // Ensure `profile` is defined here
  const [existe, setExiste] = useState(true);
  const [isLoading, setIsLoading] = useState(!profile?.uid);
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/home");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let existe = false;
      try {
        if (!profile?.profileUpdate) {
          await dispatch(getSeafarerData(userData.uid));
        } else {
          await dispatch(getProfileUpdate(userData.uid));
        }
        setExiste(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [profile?.uid, userData.uid, dispatch]);

  useEffect(() => {
    dispatch(getSeafarerHirings(userData.uid));
  }, [dispatch, userData.uid]);

  useEffect(() => {
    dispatch(getSeafarerHirings(userData.uid));
    /*  const funnel = new D3Funnel('#funnel');
    funnel.draw(funnelData, {
      chart: {
        width: 350,
        height: 400,
      },
      block: {
        dynamicHeight: true,
        fill: {
          scale: ['#3B82F6', '#22C55E', '#EAB308', '#EF4444', '#8B5CF6', '#10B981'],
        },
      },
    }); */
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          {1 === userData.recruitmentStage ||
          2 === userData.recruitmentStage ||
          3 === userData.recruitmentStage ||
          7 === userData.recruitmentStage ||
          8 === userData.recruitmentStage ||
          9 === userData.recruitmentStage ||
          10 === userData.recruitmentStage ||
          11 === userData.recruitmentStage ||
          12 === userData.recruitmentStage ||
          13 === userData.recruitmentStage ||
          14 === userData.recruitmentStage ||
          15 === userData.recruitmentStage ||
          16 === userData.recruitmentStage ||
          17 === userData.recruitmentStage ||
          18 === userData.recruitmentStage ? (
            <div className="flex flex-col items-center justify-center h-1/2">
              <img
                src={notFound}
                alt={"Profile Not Found"}
                className="size-36"
              />
              <div className="flex flex-col gap-2 items-center justify-center">
                <span>Profile not found. Try Again!</span>
                <button
                  className="flex flex-auto items-center text-[#1976d2] text-sm font-style: italic hover:bg-blue-50"
                  onClick={handleBackClick}
                  disabled={isSaving}
                >
                  <HiArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </button>
              </div>
            </div>
          ) : (
            <section className="p-5">
              <h1 className="text-lg font-bold ">Hiring Contracts</h1>
              <div className="overflow-x-auto">
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell>No.</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Company</Table.HeadCell>
                    <Table.HeadCell>Employee Number</Table.HeadCell>
                    <Table.HeadCell>Latest DOA</Table.HeadCell>
                    <Table.HeadCell>Amount of Embarkations</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y cursor-pointer">
                    {hirings.length < 1 ? (
                      <Table.Row>
                        <Table.Cell className="whitespace-nowrap">
                          {"--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {"--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {"--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {"--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {"--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {"--"}
                        </Table.Cell>
                      </Table.Row>
                    ) : (
                      hirings.map((hiring, index) => (
                        <Table.Row key={index}>
                          <Table.Cell className="whitespace-nowrap">
                            {index + 1 || "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {hiring.status?.name || "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {hiring.company?.name || "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {hiring.employeeNumber || "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {hiring.latestDOA || "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {hiring.amountEmbarks || "--"}
                          </Table.Cell>
                        </Table.Row>
                      ))
                    )}
                  </Table.Body>
                </Table>
              </div>

              {/* esos 3 div son las graficas cuidado me borra la tabla */}
              {/* <div className="w-full max-w-lg">
        <Bar options={options} data={data} />
      </div>

      <div className="w-full max-w-lg">
        <Doughnut options={doughnutOptions} data={data} />
      </div>

      <div className="w-full max-w-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Gráfica de Embudo</h2>
        <div id="funnel" />
      </div> */}
            </section>
          )}
        </>
      )}
    </>
  );
}
