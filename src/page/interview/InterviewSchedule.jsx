import { useState, useEffect } from "react";
import { ModalYesNo } from "../../components/layoutComponents";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../store/userData";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { getDateInterviews } from "../../util/services";
import iconCamara from "../../assets/Icon/iconCamaraWeb.png";
import iconTeams from "../../assets/Icon/iconTeams.png";
import iconWifi from "../../assets/Icon/Wifi.png";
import iconPC from "../../assets/Icon/iconPC.png";
import iconMicrofono from "../../assets/Icon/iconMicrofono.png";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../../config/firebase/config";
import { LoadingState } from "../../components/skeleton/LoadingState";
export default function InterviewSchedule({ type = 0 }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [dates, setDates] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loanding, setLoanding] = useState(false);
  const [loandingSchedule, setLoandingSchedule] = useState(false);
  const [datesCurrent, setDatesCurrent] = useState([]);
  const { userData } = useSelector((state) => state.userData);
  const [events, setEvents] = useState([]);
  const [groupedEvents, setGroupedEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [assigned, setAssigned] = useState();
  const [timeLeft, setTimeLeft] = useState("");
  const openModal = (value) => {
    console.log(value);
    setAssigned(value);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.currentViews);
  const loadResults = async () => {
    try {
      const dates = await getDateInterviews();
      let data = [];
      let transformedData = [];

      // Validar y transformar los datos recibidos
      if (dates && dates.data) {
        data = JSON.parse(dates.data);
        // Convertir fechas a objetos Date
        transformedData = data.map((item) => ({
          ...item,
          start: new Date(item.start), // Convertir `start` a Date
          end: new Date(item.end), // Convertir `end` a Date
        }));
      }
      const currentDate = new Date();

      const searchData = transformedData.filter((item) => {
        // Convertir la fecha de 'start' al formato Date para comparación
        const interviewStartDate = new Date(item.start);

        // Compara la fecha de inicio con la fecha actual
        return (
          item.interviewee == userData.uid && interviewStartDate >= currentDate
        );
      });
      console.log("searchData");
      console.log(searchData);
      // Si se encuentra alguna entrevista válida, se asigna a la variable 'schedule'
      if (searchData.length > 0) {
        setSchedule(searchData);
      }
      const filteredFirst = transformedData.filter(
        (data) => data.asunto == "First Interview"
      );
      const filteredSecond = transformedData.filter(
        (data) => data.asunto == "Second Interview"
      );

      setLoanding(true);
      setDates(transformedData);
      if (type == 0) {
        setDatesCurrent(transformedData);
        console.log(transformedData);
      } else if (type == 1) {
        setDatesCurrent(filteredFirst);
        console.log(filteredFirst);
      } else if (type == 2) {
        setDatesCurrent(filteredSecond);
        console.log(filteredSecond);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const handleConfirm = () => {
    assignRandomInterviewee(assigned);
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  useEffect(() => {
    /* setSchedule(
      schedule) */
    dispatch(getUserData(userData.uid));

    dispatch(getUserData());
    loadResults();
  }, []);

  const createDateFirebase = async (data) => {
    try {
      const docRef = doc(FirebaseDB, "citas/dates");
      const docId = docRef.id;
      const eventsString = JSON.stringify(data);
      await setDoc(docRef, { data: eventsString, id: docId });

      console.log("Documento creado con ID:", docId);
    } catch (error) {
      console.error("Error creando el dates:", error);
    }
  };

  // Cambiar al mes anterior
  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Cambiar al mes siguiente
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Seleccionar una fecha
  const handleDateClick = (day) => {
    setSelectedDate(day);
    const filtered = dates.filter((event) => {
      const eventDate =
        new Date(event.start).setHours(0, 0, 0, 0) ==
        normalizeDate(format(day, "yyyy-MM-dd")).setHours(0, 0, 0, 0); // Convertir el campo start a objeto Date
      return eventDate; // Comparar si es el mismo día
    });
    setEvents(filtered);
    groupEventsByHour(filtered);
  };

  const normalizeDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // Meses en JavaScript son 0-indexados
  };

  // Generar celdas para los días del mes
  const renderDays = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));
    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days.map((day, index) => (
      <div
        key={index}
        className={`w-10 h-10 flex items-center justify-center cursor-pointer ${
          !isSameMonth(day, currentMonth) ? "text-gray-400" : ""
        } ${
          isSameDay(day, selectedDate)
            ? "bg-blue-500 text-white rounded-full"
            : ""
        }`}
        onClick={() => handleDateClick(day)}
      >
        {format(day, "d")}
      </div>
    ));
  };

  const mostrar = () => {
    console.log(datesCurrent);
    console.log(schedule);
  };

  // Función para agrupar eventos por hora exacta
  const groupEventsByHour = (data) => {
    const grouped = {};

    data.forEach((event) => {
      const dateObject = new Date(event.start);
      const hour = dateObject.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (grouped[hour]) {
        grouped[hour].push(event);
      } else {
        grouped[hour] = [event];
      }
    });

    // Convertir el objeto agrupado en un array con información adicional
    const result = Object.entries(grouped).map(([hour, data]) => {
      const total = data.length;
      const availableCount = data.filter((e) => !e.interviewee).length;
      const available = availableCount > 0; // Estado de disponibilidad

      return {
        hour,
        total, // Total de eventos en esa hora
        availableCount, // Total disponibles
        available, // Estado de disponibilidad (true o false)
        data, // Lista de eventos de esa hora
      };
    });

    setGroupedEvents(result); // Guardar en el estado
  };

  const assignRandomInterviewee = (hourGroup) => {
    // Verificar si hay eventos disponibles en esta hora
    if (!hourGroup.available) {
      console.warn("No hay eventos disponibles en esta hora.");
      return;
    }

    // Filtrar los eventos disponibles (donde interviewee esté vacío)
    const availableEvents = hourGroup.data.filter((e) => !e.interviewee);

    // Si no hay eventos disponibles, salir
    if (availableEvents.length === 0) {
      console.warn("No hay eventos disponibles.");
      return;
    }

    // Seleccionar un evento aleatorio de los disponibles
    const randomIndex = Math.floor(Math.random() * availableEvents.length);
    const selectedEvent = availableEvents[randomIndex];

    // Asignar un valor al campo interviewee
    selectedEvent.interviewee = userData.uid || ""; // Aquí puedes poner el valor que necesites
    /*  console.log(selectedEvent) */

    setDatesCurrent((prevDates) => {
      const updatedDates = prevDates.map((event) =>
        event.id === selectedEvent.id
          ? { ...event, interviewee: selectedEvent.interviewee }
          : event
      );

      // Llamar a createDateFirebase con los datos actualizados

      createDateFirebase(updatedDates);
      setSchedule(selectedEvent);
      setLoandingSchedule(true);
      loadResults();
      /* console.log(updatedDates) */
      return updatedDates;
    });

    // Actualizar el estado de groupedEvents para reflejar el cambio
    setGroupedEvents((prevGroupedEvents) =>
      prevGroupedEvents.map((group) => {
        if (group.hour === hourGroup.hour) {
          // Actualizar los datos del grupo correspondiente
          const updatedData = group.data.map((event) =>
            event === selectedEvent ? selectedEvent : event
          );

          const updatedAvailableCount = updatedData.filter(
            (e) => !e.interviewee
          ).length;

          return {
            ...group,
            data: updatedData,
            availableCount: updatedAvailableCount,
            available: updatedAvailableCount > 0,
          };
        }
        return group;
      })
    );

    // También actualizar el estado de eventos generales si es necesario
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event === selectedEvent ? selectedEvent : event
      )
    );
  };

  const handleCancelSchedule = () => {
    setDatesCurrent((prevDates) => {
      const updatedDates = prevDates.map((event) =>
        event.id == schedule[0].id ? { ...event, interviewee: "" } : event
      );

      // Llamar a createDateFirebase con los datos actualizados
      createDateFirebase(updatedDates);

      setSchedule([]);
    });
    setLoanding(false);
    setLoandingSchedule(false);
    loadResults();
  };

  useEffect(() => {
    // Verificar si schedule.data tiene datos antes de ejecutar el contador
    if (schedule && schedule.length > 0) {
      console.log(schedule[0].start);
      const interval = setInterval(() => {
        const currentDate = new Date();
        const targetDate = new Date(schedule[0].start); // Usando el primer evento de schedule.data

        const diff = targetDate - currentDate;

        if (diff <= 0) {
          setTimeLeft("El evento ha comenzado o ya ha pasado");
          clearInterval(interval); // Detener el contador si la fecha ya ha pasado
        } else {
          // Cálculo de días, horas, minutos y segundos restantes
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          setTimeLeft(
            `${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos`
          );
        }
      }, 1000); // Actualiza el contador cada segundo

      return () => clearInterval(interval); // Limpiar el intervalo al desmontarse el componente
    } else {
      setTimeLeft("No hay evento programado"); // Si no hay eventos, muestra un mensaje
    }
  }, [schedule]);

  return (
    <>
      {/* <button onClick={mostrar}>mostrar</button> */}

      <h1 className="text-center text-2xl font-semibold">
        Appointment calendar
      </h1>
      {loanding ? (
        loandingSchedule ? (
          <div>
            <button
              type="button"
              onClick={handleCancelSchedule}
              className=" rounded-md bg-red-500 w-44 mt-10 h-10 text-white text-balance"
            >
              Cancel Interview
            </button>
            <div className="flex justify-center flex-col items-center py-14">
              <div className="bg-white p-2 rounded-lg shadow-lg text-center w-full max-w-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                  Time remaining for interview:
                </h2>
                <p className="text-xl font-medium text-blue-600 mb-4">
                  {timeLeft}
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="flex flex-col items-center">
                    <span className="text-5xl font-bold text-gray-800">
                      {schedule && schedule[0] && schedule[0].start
                        ? new Date(schedule[0].start).toLocaleDateString()
                        : ""}
                    </span>
                    <span className="text-xl text-gray-500">
                      {schedule && schedule[0] && schedule[0].start
                        ? new Date(schedule[0].start).toLocaleTimeString()
                        : "00:00:00"}
                    </span>
                    <span className="text-lg text-gray-500">
                      Date and time of interview
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center font-semibold text-lg text-balance">
              The following items are recommended for the day of the interview
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-center">
              <div className="text-center">
                <img src={iconPC} alt="" className="w-20 lg:w-32 m-auto" />
                <p>1. have a computer</p>
              </div>

              <div className="text-center">
                <img src={iconCamara} alt="" className="w-20 lg:w-32 m-auto" />
                <p>2. Have a good webcam</p>
              </div>
              <div className="text-center">
                <img
                  src={iconMicrofono}
                  alt=""
                  className="w-20 lg:w-32 m-auto"
                />
                <p>3. Have good headphones and microphone</p>
              </div>
              <div className="text-center">
                <img src={iconWifi} alt="" className="w-20 lg:w-32 m-auto" />
                <p>4. have a good internet connection</p>
              </div>
              <div className="text-center">
                <img src={iconTeams} alt="" className="w-20 lg:w-32 m-auto" />
                <p>5. have installed microsoft teams</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="text-lg pt-6 pb-5">
              Welcome, choose a date and time to schedule your appointment.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 justify-center items-center">
              <div className="flex flex-col items-center justify-center lg:pt-20">
                <div className="bg-blue-300 p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={handlePrevMonth}
                      className="text-white hover:text-blue-500"
                    >
                      &lt;
                    </button>
                    <h2 className="text-xl font-bold text-gray-50">
                      {format(currentMonth, "MMMM yyyy")}
                    </h2>
                    <button
                      onClick={handleNextMonth}
                      className="text-white hover:text-blue-500"
                    >
                      &gt;
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-sm font-bold text-center text-white"
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>
                  <div className="grid grid-cols-7 gap-1 mt-2">
                    {renderDays()}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-lg text-center font-semibold pb-5">
                  Hours Available
                </p>

                {groupedEvents.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {groupedEvents.map((hourGroup, index) => (
                      <div key={index} className="mb-2 text-center">
                        <button
                          onClick={() => openModal(hourGroup)}
                          className={`px-4 py-2 rounded ${
                            hourGroup.available ? "bg-green-500" : "bg-red-500"
                          } text-white`}
                        >
                          {hourGroup.hour}
                          {/* {hourGroup.hour} ({hourGroup.total}) -{" "}
          {hourGroup.available
            ? `${hourGroup.availableCount} disponibles`
            : "Agotado"} */}
                        </button>
                      </div>
                    ))}{" "}
                  </div>
                ) : (
                  <p>No hours were found available for this date</p>
                )}
              </div>
            </div>
          </>
        )
      ) : (
        <LoadingState />
      )}
      <ModalYesNo
        size="2xl"
        isOpen={isOpen}
        closeModal={closeModal}
        textyes="Attend"
        textno="Cancel"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        classmodal=" md:pt-0"
        icon={<HiOutlineQuestionMarkCircle className="w-9 h-9 m-auto" />}
      >
        <p className="text-center font-semibold text-lg text-balance">
          The following items are recommended for the day of the interview
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-center">
          <div className="text-center">
            <img src={iconPC} alt="" className="w-20 lg:w-32 m-auto" />
            <p>1. have a computer</p>
          </div>

          <div className="text-center">
            <img src={iconCamara} alt="" className="w-20 lg:w-32 m-auto" />
            <p>2. Have a good webcam</p>
          </div>
          <div className="text-center">
            <img src={iconMicrofono} alt="" className="w-20 lg:w-32 m-auto" />
            <p>3. Have good headphones and microphone</p>
          </div>
          <div className="text-center">
            <img src={iconWifi} alt="" className="w-20 lg:w-32 m-auto" />
            <p>4. have a good internet connection</p>
          </div>
          <div className="text-center">
            <img src={iconTeams} alt="" className="w-20 lg:w-32 m-auto" />
            <p>5. have installed microsoft teams</p>
          </div>
        </div>
      </ModalYesNo>
    </>
  );
}
