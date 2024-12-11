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
import { getCitas, getDateInterviews, saveCita } from "../../util/services";
import iconCamara from "../../assets/Icon/iconCamaraWeb.png";
import iconTeams from "../../assets/Icon/iconTeams.png";
import iconWifi from "../../assets/Icon/Wifi.png";
import iconPC from "../../assets/Icon/iconPC.png";
import iconMicrofono from "../../assets/Icon/iconMicrofono.png";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../../config/firebase/config";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { formatDate } from "../../util/helperFunctions";

function updateUserName(text, userName) {
  // Encuentra la posición del último paréntesis y quítalo
  const lastParenthesisIndex = text.lastIndexOf(")");
  if (lastParenthesisIndex === -1) return text; // Retorna el texto sin cambios si no encuentra un paréntesis

  // Inserta el nombre del usuario antes del paréntesis de cierre
  const updatedText = `${text.slice(0, lastParenthesisIndex)}${userName})`;
  return updatedText;
}

function removeUserName(text) {
  // Busca el inicio del texto "Usuario: " y corta hasta el paréntesis final
  const userStartIndex = text.indexOf("Usuario: ");
  if (userStartIndex === -1) return text; // Retorna el texto sin cambios si no encuentra "Usuario: "

  // Encuentra el paréntesis de cierre después de "Usuario: "
  const startOfName = userStartIndex + "Usuario: ".length;
  const endOfName = text.indexOf(")", startOfName);

  // Reconstruye el texto sin el nombre del usuario
  const updatedText = `${text.slice(0, startOfName)}${text.slice(endOfName)}`;
  return updatedText;
}

export default function InterviewSchedule({
  type = 1,
  uid = "",
  userName = "",
  onAppointmentChange = () => {},
  interviewId = "",
}) {
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
  const [availableDates, setAvailableDates] = useState([]);
  const openModal = (value) => {
    setAssigned(value);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.currentViews);
  const loadResults = async () => {
    try {
      setLoandingSchedule(false);
      // Validar y transformar los datos recibidos
      const dates = await getCitas();

      let transformedData = [];
      transformedData = dates.map((item) => ({
        ...item,
        start: item.start && item.start.toDate ? item.start.toDate() : null, // Convertir `start` a Date
        end: item.end && item.end.toDate ? item.end.toDate() : null, // Convertir `end` a Date
      }));

      const currentDate = new Date();

      const searchData = transformedData.filter((item) => {
        const interviewStartDate = new Date(item.start);
        // return (
        //   item.interviewee == userData.uid && interviewStartDate >= currentDate
        // );
        return item.interviewee == uid && item.interviewId == interviewId;
      });

      if (searchData.length) {
        setSchedule(searchData);
        setLoandingSchedule(true);
      }

      setLoanding(true);
      /* setDatesCurrent(transformedData); */

      let filteredData = transformedData;

      if (type === 1) {
        filteredData = transformedData.filter(
          (data) => data.asunto === "First Interview"
        );
      } else if (type === 2) {
        filteredData = transformedData.filter(
          (data) => data.asunto === "Second Interview"
        );
      }

      setDatesCurrent(filteredData);
      setDates(transformedData);
      const availableDays = filteredData.map((day) =>
        normalizeDate(format(day.start, "yyyy-MM-dd")).setHours(0, 0, 0, 0)
      );
      if (type !== 0) {
        setAvailableDates(availableDays || []);
      } else {
        setAvailableDates(availableDays);
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

  /* const createDateFirebase = async (data) => {
    try {
      const docRef = doc(FirebaseDB, "citas/dates");
      const docId = docRef.id;
      const eventsString = JSON.stringify(data);
      await setDoc(docRef, { data: eventsString, id: docId });

      console.log("Documento creado con ID:", docId);
    } catch (error) {
      console.error("Error creando el dates:", error);
    }
  }; */

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
    const filtered = datesCurrent.filter((event) => {
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

    // Convertir availableDays a un conjunto de fechas normalizadas
    const availableDays = new Set(
      availableDates.map((timestamp) =>
        format(new Date(timestamp), "yyyy-MM-dd")
      )
    );

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days.map((day, index) => {
      const dayKey = format(day, "yyyy-MM-dd"); // Normalizar día a formato "yyyy-MM-dd"
      const isAvailable = availableDays.has(dayKey);

      return (
        <div
          key={index}
          className={`w-10 h-10 flex items-center justify-center cursor-pointer 
            ${!isSameMonth(day, currentMonth) ? "text-gray-400" : ""} 
            ${
              isSameDay(day, selectedDate)
                ? "bg-blue-500 text-white rounded-full"
                : ""
            }
            ${!isAvailable ? "opacity-25  pointer-events-none" : ""}`}
          onClick={isAvailable ? () => handleDateClick(day) : undefined} // Solo permitir clic si está disponible
        >
          {format(day, "d")}
          {isAvailable && (
            <span className="relative -top-4 right-3 bg-white text-white text-xs w-2 h-2 flex items-center justify-center rounded-full"></span>
          )}
        </div>
      );
    });
  };

  const mostrar = () => {
    console.log(datesCurrent);
    console.log(schedule);
  };

  // Función para agrupar eventos por hora exacta
  // const groupEventsByHour = (data) => {
  //   const grouped = {};

  //   data.forEach((event) => {
  //     const dateObject = new Date(event.start);
  //     const hour = dateObject.toLocaleTimeString("en-US", {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     });

  //     if (grouped[hour]) {
  //       grouped[hour].push(event);
  //     } else {
  //       grouped[hour] = [event];
  //     }
  //   });

  //   // Convertir el objeto agrupado en un array con información adicional
  //   const result = Object.entries(grouped).map(([hour, data]) => {
  //     const total = data.length;
  //     const availableCount = data.filter((e) => !e.interviewee).length;
  //     const available = availableCount > 0; // Estado de disponibilidad

  //     return {
  //       hour,
  //       total, // Total de eventos en esa hora
  //       availableCount, // Total disponibles
  //       available, // Estado de disponibilidad (true o false)
  //       data, // Lista de eventos de esa hora
  //     };
  //   });

  //   setGroupedEvents(result); // Guardar en el estado
  // };

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
    const result = Object.entries(grouped)
      .map(([hour, data]) => {
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
      })
      .sort((a, b) => {
        // Ordenar el arreglo por hora
        const timeA = new Date(`1970-01-01T${a.hour}`).getTime();
        const timeB = new Date(`1970-01-01T${b.hour}`).getTime();
        return timeA - timeB;
      });
    // console.log(result);

    setGroupedEvents(result); // Guardar en el estado
  };

  const assignRandomInterviewee = async (hourGroup) => {
    // const interviewId =
    //   type == 1
    //     ? userData.firstInterview.currentInterview
    //     : userData.secondInterview.currentInterview;

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
    selectedEvent.title = updateUserName(selectedEvent.title, userName);
    selectedEvent.interviewee = uid || "";
    selectedEvent.status = "Appointed"; // Aquí puedes poner el valor que necesites
    selectedEvent.interviewId = interviewId;

    await saveCita(selectedEvent.id, selectedEvent);
    setSchedule([selectedEvent]);
    setLoandingSchedule(true);
    // Agregar la validación de solapamiento de fechas
    const singleDate = selectedEvent; // El evento seleccionado
    const overlappingEvents = validateTimeOverlap(hourGroup.data, singleDate); // Llamar a la validación

    // Si hay eventos que se solapan, actualiza su estado
    overlappingEvents.forEach((event) => {
      event.status = "Expired"; // Cambiar el estado de los eventos solapados
    });

    // Actualizar el estado de los eventos con la nueva información
    setDatesCurrent((prevDates) => {
      const updatedDates = prevDates.map((event) =>
        event.id === selectedEvent.id
          ? {
              ...event,
              interviewee: selectedEvent.interviewee,
              status: selectedEvent.status,
            }
          : event
      );

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
    onAppointmentChange(true);
  };

  // Función de validación de solapamiento de fechas
  const validateTimeOverlap = (events, singleDate) => {
    const singleStart = new Date(singleDate.start).getTime(); // Inicio del rango
    const singleEnd = new Date(singleDate.end).getTime(); // Fin del rango

    // Función para verificar si dos fechas son del mismo día
    const isSameDay = (date1, date2) => {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    };

    // Filtrar las coincidencias
    const overlappingDates = dates.filter((date) => {
      const dateStart = new Date(date.start).getTime(); // Inicio del intervalo
      const dateEnd = new Date(date.end).getTime(); // Fin del intervalo

      return (
        date.id !== singleDate.id && // Excluir el mismo objeto
        date.interviewer === singleDate.interviewer && // Mismo entrevistador
        isSameDay(new Date(date.start), new Date(singleDate.start)) && // Mismo día
        ((dateStart > singleStart && dateStart < singleEnd) || // El inicio está dentro del rango
          (dateEnd > singleStart && dateEnd < singleEnd) || // El final está dentro del rango
          (dateStart < singleStart && dateEnd > singleEnd)) // El rango abarca el rango del singleDate
      );
    });

    overlappingDates.forEach(async (event) => {
      event.status = "Expired"; // Asegúrate de asignar el estado aquí.
      await saveCita(event.id, event); // Llama a saveCita con los valores actualizados.
    });

    return overlappingDates;
  };

  const handleCancelSchedule = async () => {
    // Indicar que el proceso de carga ha comenzado
    setLoanding(false);

    // Actualizar el estado y guardar la cita
    setDatesCurrent((prevDates) => {
      const updatedDates = prevDates
        .filter((event) => event.id == schedule[0].id)
        .map((event) => ({
          id: event.id,
          interviewee: "",
          status: "Pending",
          interviewId: "",
          interviewer: "",
          title: removeUserName(schedule[0].title),
        }));

      // Guardar la cita actualizada
      saveCita(updatedDates[0].id, updatedDates[0]);

      // Limpiar el schedule
      setSchedule([]);
      onAppointmentChange(true);

      return prevDates;
    });

    // Llamar a la función de carga y esperar a que termine
    await loadResults();

    // Indicar que el proceso ha terminado
    setLoanding(true);
    setLoandingSchedule(false);
  };

  useEffect(() => {
    // Verificar si schedule.data tiene datos antes de ejecutar el contador
    if (schedule && schedule.length > 0) {
      const interval = setInterval(() => {
        const currentDate = new Date();
        const targetDate = new Date(schedule[0].start); // Usando el primer evento de schedule.data

        const diff = targetDate - currentDate;

        if (diff <= 0) {
          setTimeLeft("The event is in progress or already expired");
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
            `${days} days, ${hours} hours, ${minutes} minutes y ${seconds} seconds`
          );
        }
      }, 1000); // Actualiza el contador cada segundo

      return () => clearInterval(interval); // Limpiar el intervalo al desmontarse el componente
    } else {
      setTimeLeft("There's no programmed appointment"); // Si no hay eventos, muestra un mensaje
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
                    <div className="my-5 flex flex-col gap-4">
                      <span className="text-lg text-gray-500">
                        Interview Meeting Link
                      </span>
                      {!schedule[0].link ? (
                        <span className="text-md text-gray-500">
                          {"Link not available yet."}
                        </span>
                      ) : (
                        <a
                          className="text-md underline text-blue-700 break-all"
                          href={`${schedule[0].link}`}
                          target="_blank"
                          // rel="noopener noreferrer"
                        >
                          {schedule[0].link}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center font-semibold text-lg text-balance">
              The following resources are recommended for the day of the
              interview
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
                {availableDates.length > 0 ? (
                  <>
                    <p className="text-lg text-center font-semibold pb-5">
                      Hours Available
                    </p>
                    {groupedEvents.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4">
                        {groupedEvents.map((hourGroup, index) => (
                          <div key={index} className="mb-2 text-center">
                            <button
                              onClick={() => openModal(hourGroup)}
                              disabled={!hourGroup.available}
                              className={`px-4 py-2 rounded ${
                                hourGroup.available
                                  ? "bg-green-500 text-white"
                                  : "text-zinc-400"
                              }  `}
                            >
                              {hourGroup.hour}
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center">
                        Please select a day from the list of available days to
                        check availability hours.
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-center">
                    Sorry! It seems at this time there are no available dates to
                    schedule an interview.
                  </p>
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
          The following resources are recommended for the day of the interview
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
