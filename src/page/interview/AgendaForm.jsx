import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  downloadExcel,
  getDateInterviews,
  getInterviewers,
  getTemplate,
} from "../../util/services";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../../config/firebase/config";
import {
  DatepickerComponent,
  SelectComponents,
} from "../../components/layoutComponents";
import { Drawer } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { useAutoAnimate } from "@formkit/auto-animate/react";
const localizer = momentLocalizer(moment);

const asunto = ["", "First Interview", "Second Interview"];
const durations = ["", 5, 10, 15, 30];

const AgendaForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const [events, setEvents] = useState([]);
  const [dataEvents, setDataEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [template, setTemplate] = useState([]);
  const [showSection, setShowSection] = useState({
    manual: false,
    template: false,
    filter: false,
  });
  const [filter, setFilter] = useState({
    template: "",
    filterTemplate: "",
    valueFilterTemplate: "",
    valueFilterMode: "",
  });
  const [data, setData] = useState({ entrevistador: "", template: "" });
  const [filterData, setFilterData] = useState({
    start: "",
    end: "",
    mode: "",
  });
  const [filteredEvents, setFilteredEvents] = useState();
  const [interviewFilter, setInterviewFilter] = useState({ interviewer: [] });
  const [eventsDataFilter, setEventsDataFilter] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    startTime: "",
    endTime: "",
    interview: "",
    interviewer: [],
    interviewee: "",
    duration: "",
    status: "Pending",
    mode: "",
    link: "",
  });
  const [parent] = useAutoAnimate();

  const handleFilter = (e) => {
    if (e.target.name == "plantilla") {
      setFilter((prevState) => ({
        ...prevState,
        filterTemplate: e.target.value,
      }));
    } else if (e.target.name == "filtro") {
      const filteredTemplate = template.filter(
        (t) => t.interview == e.target.value
      );
      setFilter((prevState) => ({
        ...prevState,
        template: filteredTemplate,
        valueFilterTemplate: e.target.value,
      }));
    } else if (e.target.name == "mode") {
      setFilter((prevState) => ({
        ...prevState,
        valueFilterMode: e.target.value,
      }));
    }
  };

  /*  const convertToFullDate = (time, referenceDate) => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date(referenceDate);
    date.setHours(hours, minutes, 0, 0);
    return date;
  }; */

  const normalizeDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // Meses en JavaScript son 0-indexados
  };

  // Función para filtrar entrevistas
  const filterInterviews = (e = null) => {
    if (e) e.preventDefault();
    setEventsDataFilter(
      dataEvents.filter((interview) => {
        const matchesInterviewer =
          interviewFilter.interviewer && interviewFilter.interviewer.length
            ? interviewFilter.interviewer.includes(interview.interviewer)
            : true;
        const matchesStart = filterData.start
          ? new Date(interview.start).setHours(0, 0, 0, 0) >=
            normalizeDate(filterData.start).setHours(0, 0, 0, 0)
          : true;
        const matchesEnd = filterData.end
          ? new Date(interview.end).setHours(0, 0, 0, 0) <=
            normalizeDate(filterData.end).setHours(0, 0, 0, 0)
          : true;
        /* console.log(filterData) */
        const matchesMode = filterData.mode
          ? interview.mode === filterData.mode
          : true;
        const matchesAsunto = filterData.asunto
          ? interview.asunto === filterData.asunto
          : true;
        return (
          matchesInterviewer &&
          matchesStart &&
          matchesEnd &&
          matchesMode &&
          matchesAsunto
        );
      })
    );
  };

  const handleFilterData = (e) => {
    setFilterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const cleanFilter = (e) => {
    e.preventDefault();
    setFilterData({ start: "", end: "", mode: "", asunto: "" });
    setInterviewFilter({ interviewer: [] });
    setEventsDataFilter(dataEvents);
  };

  const toggleSection = (section) => {
    setShowSection((prevState) => {
      const newState = {
        ...prevState,
        [section]: !prevState[section],
        [section === "manual" ? "template" : "manual"]: false,
      };

      if (!newState.manual) {
        setNewEvent({
          title: "",
          startTime: "",
          endTime: "",
          interview: "",
          interviewer: [],
          interviewee: "",
          duration: durations[0],
          status: "Pending",
          mode: "",
          link: "",
        });
      } else {
        setFilter({
          template: "",
          filterTemplate: "",
          valueFilterTemplate: "",
          valueFilterMode: "",
        });
      }

      return newState;
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setNewEvent((prevEvent) => {
      // Copiamos los valores seleccionados actuales o inicializamos con un array vacío
      const updatedInterviewers = prevEvent.interviewer
        ? [...prevEvent.interviewer]
        : [];

      if (checked) {
        // Agregamos el ID si está seleccionado
        updatedInterviewers.push(value);
      } else {
        // Quitamos el ID si está deseleccionado
        const index = updatedInterviewers.indexOf(value);
        if (index > -1) {
          updatedInterviewers.splice(index, 1);
        }
      }

      return {
        ...prevEvent,
        interviewer: updatedInterviewers, // Actualizamos la lista de entrevistadores
      };
    });
  };

  const handleCheckboxChangeFilter = (e) => {
    const { value, checked } = e.target;
    setInterviewFilter((prevEvent) => {
      // Copiamos los valores seleccionados actuales o inicializamos con un array vacío
      const updatedInterviewers = prevEvent.interviewer
        ? [...prevEvent.interviewer]
        : [];

      if (checked) {
        // Agregamos el ID si está seleccionado
        updatedInterviewers.push(value);
      } else {
        // Quitamos el ID si está deseleccionado
        const index = updatedInterviewers.indexOf(value);
        if (index > -1) {
          updatedInterviewers.splice(index, 1);
        }
      }

      return {
        ...prevEvent,
        interviewer: updatedInterviewers, // Actualizamos la lista de entrevistadores
      };
    });
  };

  const loadResults = async () => {
    try {
      // Obtener los datos necesarios
      const entrevistador = await getInterviewers();
      const template = await getTemplate();
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

      // Actualizar los estados
      setDataEvents(transformedData);
      setFilteredEvents(transformedData);
      setData({
        ...data, // Asegúrate de que esta estructura coincida con lo que necesitas
        entrevistador,
        template,
      });
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, options } = e.target;

    // Si el input tiene 'options', lo tratamos como un select múltiple
    const newValue = options
      ? Array.from(options)
          .filter((option) => option.selected)
          .map((option) => option.value)
      : value;

    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: newValue, // Almacenamos el valor como array o string, según el tipo de input
    }));
  };

  useEffect(() => {
    loadResults();
  }, []);

  useEffect(() => {
    filterInterviews();
  }, [dataEvents]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const createDateFirebase = async () => {
    try {
      const docRef = doc(FirebaseDB, "citas/dates");
      const docId = docRef.id;
      const eventsString = JSON.stringify(dataEvents);
      await setDoc(docRef, { data: eventsString, id: docId });

      console.log("Documento creado con ID:", docId);
      setEvents([]);
    } catch (error) {
      console.error("Error creando el dates:", error);
    }
  };

  function getNameInterviewer(uid) {
    const result = data.entrevistador.find((item) => item.uid === uid);
    return result ? result.displayName : "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación inicial
    if (!selectedDate) {
      alert("Por favor, ingresa una fecha");
      return;
    }

    if (
      !newEvent.startTime ||
      !newEvent.endTime ||
      !newEvent.duration ||
      !newEvent.interviewer.length
    ) {
      alert("Faltan datos para generar los eventos");
      return;
    }

    // Función para crear los bloques de tiempo
    const createTimeSlots = () => {
      const timeSlots = [];
      const start = new Date(`${selectedDate}T${newEvent.startTime}`);
      const end = new Date(`${selectedDate}T${newEvent.endTime}`);
      const duration = newEvent.duration; // Duración en minutos

      newEvent.interviewer.forEach((interviewerId) => {
        let currentStart = new Date(start);

        // Creamos bloques de tiempo hasta alcanzar el final
        while (currentStart < end) {
          let currentEnd = new Date(currentStart.getTime() + duration * 60000); // Añade la duración en milisegundos

          if (currentEnd > end) {
            currentEnd = new Date(end); // Ajusta al límite final
          }

          // Generamos un id único
          const id = `${interviewerId}-${currentStart.toISOString()}-${currentEnd.toISOString()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;

          // Agregamos el bloque de tiempo
          timeSlots.push({
            id, // Campo único para identificar el evento
            title: `${
              filter.valueFilterTemplate
            } (Entrevistador: ${getNameInterviewer(interviewerId)}, Usuario: ${
              newEvent.interviewee
            })`,
            asunto: filter.valueFilterTemplate,
            start: currentStart,
            end: currentEnd,
            interviewer: interviewerId,
            interviewee: newEvent.interviewee,
            duration: duration,
            status: newEvent.status,
            mode: filter.valueFilterMode,
            link: newEvent.link,
          });

          // Avanzamos al siguiente bloque
          currentStart = new Date(currentStart.getTime() + duration * 60000);
        }
      });

      return timeSlots;
    };

    try {
      // Creamos los bloques de tiempo
      const newTimeSlots = createTimeSlots();
      console.log("Nuevos bloques de tiempo creados:", newTimeSlots);

      // Actualizamos dataEvents y evitamos duplicados
      setDataEvents((prevData) => {
        const existingIds = new Set(prevData.map((event) => event.id)); // Conjunto de IDs existentes
        const filteredSlots = newTimeSlots.filter(
          (event) => !existingIds.has(event.id)
        ); // Filtramos duplicados
        return [...prevData, ...filteredSlots];
      });

      // Actualizamos events
      setEvents((prevEvents) => {
        const existingIds = new Set(prevEvents.map((event) => event.id)); // Conjunto de IDs existentes
        const mergedEvents = newTimeSlots.filter(
          (event) => !existingIds.has(event.id)
        ); // Filtramos duplicados
        return [...prevEvents, ...mergedEvents];
      });

      // Restablecemos el estado de newEvent
      setNewEvent({
        title: "",
        startTime: "",
        endTime: "",
        interviewer: [],
        interviewee: "",
        duration: durations[0] || 30, // Valor por defecto si durations está vacío
        status: "",
        link: "",
      });

      // Restablecemos el estado de filtros
      setFilter({
        template: "",
        filterTemplate: "",
        valueFilterTemplate: "",
      });
    } catch (error) {
      console.error("Error al crear los bloques de tiempo:", error);
      alert(
        "Ocurrió un error al crear los eventos. Por favor, verifica los datos ingresados."
      );
    }
  };

  const mostrar = () => {
    console.log(events);
    console.log(newEvent);
    console.log(filter);
    console.log(interviewFilter);
    console.log(filterData);
    console.log(eventsDataFilter);
  };

  const handleDowloadExcelSchedule = async () => {
    try {
      const transformedData = eventsDataFilter.map((item) => {
        const startDate = new Date(item.start); // Convertir a objeto Date
        const endDate = new Date(item.end);

        // Formatear la fecha como MM/DD/YYYY
        const formattedDate = `${
          startDate.getMonth() + 1
        }/${startDate.getDate()}/${startDate.getFullYear()}`;

        return {
          stage: item.asunto,
          duration: item.duration[0], // Usamos el primer valor del array
          Date: formattedDate, // Fecha formateada como MM/DD/YYYY
          startTime: startDate.toLocaleTimeString(), // Hora inicial
          endTime: endDate.toLocaleTimeString(), // Hora final
          interview: getNameInterviewer(item.interviewer),
          Mode: item.mode,
          Status: item.status,
        };
      });

      // Llamar a la función de descarga con los datos transformados
      await downloadExcel(transformedData, "schedule", "Schedule");
    } catch (error) {
      console.error("Error al descargar el reporte:", error.message);
    }
  };
  return (
    <>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="md:w-1/2"
      >
        <Drawer.Header
          title="Add new appointment dates"
          titleIcon={() => <HiPlus className="h-4 w-4 mr-2" />}
        />
        <Drawer.Items>
          <form onSubmit={handleSubmit} className=" text-center">
            <>
              <fieldset className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 mb-6 ">
                <legend className="text-center bg-teal-500 w-full p-1 text-gray-50 mb-2">
                  TIME
                </legend>
                <input
                  type="date"
                  className="w-full border border-gray-400 h-10 rounded-md"
                  value={selectedDate}
                  onChange={handleDateChange}
                />

                <label>Interview:</label>
                <select
                  className=" w-full border border-gray-400 h-10 rounded-md"
                  name="filtro"
                  value={filter.valueFilterTemplate}
                ></select>
                <div className="col-span-1">
                  <label>Duration of the Interview:</label>
                  <select
                    name="duration"
                    value={newEvent.duration}
                    required
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-400 h-10 rounded-md"
                  >
                    {durations.map((duration, index) =>
                      duration != "" ? (
                        <option key={index} value={duration}>
                          {duration} minutes
                        </option>
                      ) : (
                        <option key={index} value={duration}>
                          {duration}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="col-span-1">
                  <label>Start Time:</label>
                  <input
                    type="time"
                    name="startTime"
                    value={newEvent.startTime}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-400 h-10 rounded-md p-2"
                  />
                </div>
                <div className="col-span-1">
                  <label>End Time:</label>
                  <input
                    type="time"
                    name="endTime"
                    value={newEvent.endTime}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-400 h-10 rounded-md p-2"
                  />
                </div>
              </fieldset>
              <fieldset className="">
                <legend className="text-center bg-teal-500 w-full p-1 text-gray-50 mt-2">
                  STAFF
                </legend>
                <label className="block pt-4">Interviewer:</label>
                <div className="grid grid-cols-1 lg:grid-cols-3 border border-gray-500 gap-1 px-5 py-2 justify-center items-center">
                  {data.entrevistador.length > 0 &&
                    data.entrevistador.map((interviewer, index) => (
                      <div key={index}>
                        <div className="">
                          <label className="flex gap-2">
                            <input
                              type="checkbox"
                              name="interviewer"
                              value={interviewer.id}
                              checked={
                                newEvent.interviewer?.includes(
                                  interviewer.id
                                ) || false
                              } // Verifica si está seleccionado
                              onChange={handleCheckboxChange}
                              className={`form-checkbox h-5 w-5 ${
                                newEvent.interviewer?.includes(interviewer.id)
                                  ? "text-green-500"
                                  : "text-gray-500"
                              }`} // Cambia el color cuando está seleccionado
                            />
                            {interviewer.displayName}
                          </label>
                        </div>
                      </div>
                    ))}
                </div>
              </fieldset>
            </>

            <button
              type="submit"
              className="bg-[#1976d2]  rounded-md w-44 h-10 mt-4 text-center text-gray-50"
            >
              Agregar Entrevista
            </button>
          </form>
        </Drawer.Items>
      </Drawer>
      {/* <button type="button" onClick={mostrar} className={` bg-[#1976d2]  rounded-md w-44 h-10  text-center text-gray-50`}>mostrar</button> */}
      <p
        className={`${
          events.length > 0 ? "block" : "hidden"
        } text-lg text-red-600 text-end`}
      >
        You have unsaved schedules
      </p>
      <div className="flex justify-end items-center">
        {/* <button
          type="button"
          onClick={() => toggleSection("manual")}
          className={` bg-[#1976d2]  rounded-md w-44 h-10  text-center text-gray-50`}
        >
          {showSection.manual ? "Ocultar" : "Agregar"}
        </button>
        <button
          type="button"
          disabled={events.length >= 1 ? false : true}
          onClick={createDateFirebase}
          className={`ml-5 bg-[#1976d2] disabled:opacity-30  rounded-md w-48 h-10  text-center text-gray-50`}
        >
          Save Schedule
        </button> */}
        <button
          className="whitespace-nowrap border border-[#010064] bg-[#010064] text-white w-10 md:w-28 h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30"
          onClick={() => setIsOpen(true)}
        >
          <HiPlus className="h-4 w-4" />
          <span className="hidden md:block ">Add Dates</span>
        </button>
      </div>
      <section
        className={`${
          showSection.template ? "lg:grid-cols-3" : "lg:grid-cols-3"
        } grid grid-cols-1 md:grid-cols-1 gap-6 pt-7 items-center justify-center`}
      >
        {showSection.template || showSection.manual ? (
          <>
            <div className="">
              <label>Fecha de programacion:</label>
              <input
                type="date"
                className="w-full border border-gray-400 h-10 rounded-md"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <div className="">
              <label>Interview:</label>
              <select
                className=" w-full border border-gray-400 h-10 rounded-md"
                name="filtro"
                value={filter.valueFilterTemplate}
                onChange={handleFilter}
              >
                {asunto.map((title, index) => (
                  <option key={index} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label>Interview Stage:</label>
              <select
                className="w-full border border-gray-400 h-10 rounded-md px-2"
                name="mode"
                value={filter.valueFilterMode}
                onChange={handleFilter}
                aria-label="Filter interview modality"
              >
                <option value="">Select the interview modality</option>
                <option value="Face To Face">Face To Face</option>
                <option value="Online">Online</option>
              </select>
            </div>
          </>
        ) : null}

        {showSection.template ? (
          <div className=" pl-2 text-center">
            <label>Plantilla:</label>
            <select
              className="rounded-lg ml-2"
              name="plantilla"
              required
              onChange={handleFilter}
            >
              {filter.template && filter.template.length > 0 ? (
                filter.template.map((title, index) => (
                  <option key={index} value={title.nameTemplate}>
                    {title.nameTemplate}
                  </option>
                ))
              ) : (
                <option value="">Escoge plantilla</option>
              )}
            </select>
          </div>
        ) : null}
      </section>

      <div className="flex justify-between ">
        {/* <button
          type="button"
          className={` ${
            eventsDataFilter.length > 0 ? "block" : "hidden"
          } bg-green-600  rounded-md w-32 h-10  text-center text-gray-50`}
          onClick={() => toggleSection("filter")}
        >
          Filter
        </button> */}
        <button
          className="ml-5 border border-blue-300 bg-white text-blue-600 size-10 md:w-24 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50"
          onClick={() => toggleSection("filter")}
          title="Filters"
        >
          {showSection.filter ? (
            <MdFilterAltOff className="w-6 h-5 " />
          ) : (
            <MdFilterAlt className="w-6 h-5" />
          )}
          <span className="hidden md:block ">Filters</span>
        </button>
        <button
          onClick={handleDowloadExcelSchedule}
          className="md:w-32 md:h-10 bg-green-600 text-center text-sm rounded-md text-white"
        >
          Export to Excel
        </button>
      </div>
      <div ref={parent}>
        {showSection.filter ? (
          <form onSubmit={filterInterviews}>
            <fieldset className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 mb-6 ">
              <div>
                <p className="text-sm text-gray-400 pb-2">Interview Stage:</p>
                <SelectComponents
                  name={"asunto"}
                  initialValue={filterData.asunto}
                  Text="Interview Stage"
                  className={""}
                  data={[
                    { id: 1, name: "First Interview" },
                    { id: 2, name: "Second Interview" },
                  ]}
                  idKey="name"
                  valueKey="name"
                  onChange={handleFilterData}
                  isRequire={false}
                />
              </div>
              <div>
                <p className="text-sm text-gray-400 pb-2">Interview Mode:</p>
                <SelectComponents
                  name={"mode"}
                  initialValue={filterData.mode}
                  /* valueDefault={"Interview Mode:"} */
                  label={"Interview Mode"}
                  Text="Interview Mode"
                  className={""}
                  data={[
                    { id: 1, name: "Face To Face" },
                    { id: 2, name: "Online" },
                  ]}
                  idKey="name"
                  valueKey="name"
                  onChange={handleFilterData}
                  isRequire={false}
                />
              </div>
              <DatepickerComponent
                classnamedate=""
                label="Start Date"
                classnamelabel="-translate-y-5"
                datevalue={filterData.start || ""}
                name="start"
                onChange={handleFilterData}
              />
              <DatepickerComponent
                classnamedate=""
                label="End Date:"
                classnamelabel="-translate-y-5"
                datevalue={filterData.end || ""}
                name="end"
                onChange={handleFilterData}
              />
            </fieldset>

            <fieldset className="">
              <label className="block pt-4">Interviewer:</label>
              <div className="grid grid-cols-1 lg:grid-cols-3 border border-gray-500 gap-1 px-5 py-2 justify-center items-center">
                {data.entrevistador.length > 0 &&
                  data.entrevistador.map((interviewer, index) => (
                    <div key={index}>
                      <div className="">
                        <label className="flex gap-2">
                          <input
                            type="checkbox"
                            name="interviewer"
                            value={interviewer.id}
                            checked={
                              interviewFilter.interviewer?.includes(
                                interviewer.id
                              ) || false
                            } // Verifica si está seleccionado
                            onChange={handleCheckboxChangeFilter}
                            className={`form-checkbox h-5 w-5 ${
                              newEvent.interviewer?.includes(interviewer.id)
                                ? "text-green-500"
                                : "text-gray-500"
                            }`} // Cambia el color cuando está seleccionado
                          />
                          {interviewer.displayName}
                        </label>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex items-center justify-center gap-10 p-5">
                <button
                  type="submit"
                  className={` bg-blue-600  rounded-md w-32 h-10  text-center text-gray-50`}
                >
                  search
                </button>
                <button
                  type="button"
                  className={` bg-gray-500  rounded-md w-32 h-10  text-center text-gray-50`}
                  onClick={cleanFilter}
                >
                  clean
                </button>
              </div>
            </fieldset>
          </form>
        ) : null}
        <div className="pt-10">
          <Calendar
            localizer={localizer}
            events={eventsDataFilter}
            startAccessor="start"
            endAccessor="end"
            className=""
            style={{ height: "100vh" }}
            messages={{
              next: "Next",
              previous: "Previous",
              today: "Today",
              month: "Month",
              week: "Week",
              day: "Day",
            }}
            onSelectEvent={(event) =>
              alert(
                `Entrevistador: ${event.interviewer}\nUsuario: ${event.interviewee}`
              )
            }
          />
        </div>
      </div>
    </>
  );
};

export default AgendaForm;
