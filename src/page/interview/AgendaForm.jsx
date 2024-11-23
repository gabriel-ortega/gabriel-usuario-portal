
import { useState,useEffect}  from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Cookies from 'js-cookie';
import { getInterviewers,getTemplate } from '../../util/services';
import { doc, setDoc } from 'firebase/firestore';
import { FirebaseDB } from '../../config/firebase/config';
const localizer = momentLocalizer(moment);

const asunto = ['','Primera Entrevista','Segunda Entrevista']; 
const durations = ["",5, 10, 15, 30];

const AgendaForm = () => {
 
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [template,setTemplate] = useState([])
  const [showSection,setShowSection] = useState({manual:false,template:false})
  const [filter,setFilter] = useState({template:"",filterTemplate:"",valueFilterTemplate:""})
  const [data,setData] = useState({entrevistador:"",template:""})
  const [filteredEvents,setFilteredEvents] = useState()
  const [newEvent, setNewEvent] = useState({
    title: '',
    startTime: '',
    endTime: '',
    interview:"",
    interviewer:[],
    interviewee:"",
    duration:"",
    status:"pendiente",
    link:"",

  })

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
        valueFilterTemplate:e.target.value
      }));
    }
  };

  const toggleSection = (section) => {
    setShowSection(prevState => {
      const newState = {
        ...prevState,
        [section]: !prevState[section],
        [section === 'manual' ? 'template' : 'manual']: false 
      };
  
      if (!newState.manual) {
        setNewEvent({
          title: '',
          startTime: '',
          endTime: '',
          interview:"",
          interviewer:[],
          interviewee:"",
          duration:durations[0],
          status:"pendiente",
          link:""
        });
      }else{
        setFilter({template:"",filterTemplate:"",valueFilterTemplate:""})
      }
  
      return newState;
    });
  };
  
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setNewEvent((prevEvent) => {
      // Copiamos los valores seleccionados actuales o inicializamos con un array vacío
      const updatedInterviewers = prevEvent.interviewer ? [...prevEvent.interviewer] : [];
  
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
      const entrevistador = await getInterviewers()
      const template = await getTemplate()
      console.log(entrevistador)
      setData(
        {
          ...data,
          entrevistador:entrevistador,
          template:template
        }
      )
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, options } = e.target;
  
    // Si el input tiene 'options', lo tratamos como un select múltiple
    const newValue = options
      ? Array.from(options)
          .filter(option => option.selected)
          .map(option => option.value)
      : value;
  
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: newValue, // Almacenamos el valor como array o string, según el tipo de input
    }));
  };
  

  useEffect(() => {
/*     const value = Cookies.get('myCookie') ? JSON.parse(Cookies.get('myCookie')) : false;
    const storedEvents = Cookies.get('events') ? JSON.parse(Cookies.get('events')) : false;
    
    if (value) {
      setTemplate(value);
    }
  
    if (storedEvents) {
      setEvents(storedEvents);
    } */
    loadResults()
  }, []);
  
  

  useEffect(()=>{
    const filteredEvent = events.filter(event => { 
      const eventDate = moment(event.start).format('YYYY-MM-DD');
      return eventDate === selectedDate && event.interviewee === "";
    });

    setFilteredEvents(filteredEvent)
  },[events])
  

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const createDateFirebase = async () => {
    try {
      const docRef = doc(FirebaseDB, "citas/dates"); 
    const docId = docRef.id;
    await setDoc(docRef, { data:events, id: docId });
  
      console.log("Documento creado con ID:", docId);
    } catch (error) {
      console.error("Error creando el dates:", error);
    }
  };


/*   const handleStartTimeChange = (e) => {
  if(selectedDate){
    const { value } = e.target;
    setNewEvent((prevEvent) => {
      const start = moment(`${selectedDate}T${value}`);
      const end = start.clone().add(prevEvent.duration, 'minutes');
      return {
        ...prevEvent,
        startTime: value,
        endTime: end.format('HH:mm'),
      };
  
    });
  }else{
alert("seleccione una fecha")
  }
  }; */

/*   const handleDurationChange = (e) => {
    const { value } = e.target;
    setNewEvent((prevEvent) => {
      return {
        ...prevEvent,
        duration: value,
      };
    });
  }; */

  function getNameInterviewer(uid) {
    const result = data.entrevistador.find(item => item.uid === uid);
    return result ? result.displayName : "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!selectedDate) {
      alert("Enter Date");
      return;
    }
  
    let updatedDataTemplate = [];
  console.log(filter.template.length)
    if (filter.template.length == 0) {
      const createTimeSlots = () => {
        const start = new Date(`${selectedDate}T${newEvent.startTime}`);
        const end = new Date(`${selectedDate}T${newEvent.endTime}`);
        const duration = newEvent.duration; // Duración en minutos
      
        const timeSlots = [];
      
        // Recorremos cada entrevistador en el array `newEvent.interviewer`
        newEvent.interviewer.forEach((interviewerId) => {
          let currentStart = new Date(start);
      
          // Creamos bloques de tiempo hasta que currentStart alcance o supere end
          while (currentStart < end) {
            let currentEnd = new Date(currentStart.getTime() + duration * 60000); // Añade la duración en milisegundos
      
            // Si currentEnd supera el end, lo ajustamos a end
            if (currentEnd > end) {
              currentEnd = new Date(end);
            }
      
            // Agregamos cada bloque de tiempo al array de eventos, uno para cada entrevistador
            timeSlots.push({
              title: `${filter.valueFilterTemplate} (Entrevistador: ${getNameInterviewer(interviewerId)}, Usuario: ${newEvent.interviewee})`,
              asunto: filter.valueFilterTemplate,
              start: currentStart,
              end: currentEnd,
              interviewer: interviewerId,
              interviewee: newEvent.interviewee,
              duration: duration,
              status: newEvent.status,
              link: newEvent.link,
            });
      
            // Avanzamos el currentStart al siguiente bloque de tiempo
            currentStart = new Date(currentStart.getTime() + duration * 60000);
          }
        });
      
        return timeSlots;
      };
      
      // Uso en setEvents
      setEvents((prevEvents) => {
        const newTimeSlots = createTimeSlots();
        const updatedDataTemplate = [...prevEvents, ...newTimeSlots];
        Cookies.set('events', JSON.stringify(updatedDataTemplate), { expires: 7 });
        return updatedDataTemplate;
      });
  
    } else {
      const eventsFromTemplates = filter.template
        .filter((template) => template.nameTemplate === filter.filterTemplate)
        .flatMap((template) => {
          return template.dates.map((date) => {
            const start = new Date(`${selectedDate}T${date.start}`);
            const end = new Date(`${selectedDate}T${date.end}`);
  
            return {
              title: `${date.title} (Entrevistador: ${date.interviewer}, Usuario: ${date.interviewee})`,
              asunto:date.title,
              start: start,
              end: end,
              interviewer: date.interviewer,
              interviewee: date.interviewee,
              duration: date.duration,
              status: date.status,
              link: date.link,
            };
          });
        });
  
      setEvents((prevEvents) => {
        updatedDataTemplate = [...prevEvents, ...eventsFromTemplates]; 
        Cookies.set('events', JSON.stringify(updatedDataTemplate), { expires: 7 }); 
        return updatedDataTemplate;
      });
    }
  
    setNewEvent({
      title: '',
      startTime: '',
      endTime: '',
      interviewer: "",
      interviewee: "",
      duration: durations[0],
    });

    setFilter({template:"",filterTemplate:"",valueFilterTemplate:""})
  };
  

  const mostrar=(()=>{
    console.log(events)
    console.log(newEvent)
    console.log(filter)
  })
  return (
    <>
     <h1 className='text-center font-semibold text-lg mt-5'>Programación de Citas</h1>
     <button type="button" onClick={mostrar} className={` bg-[#1976d2]  rounded-md w-44 h-10  text-center text-gray-50`}>mostrar</button>
     <div className='flex '>
      
        
     <button type="button" onClick={() => toggleSection('manual')} className={` bg-[#1976d2]  rounded-md w-44 h-10  text-center text-gray-50`}>Agregar Citas Manual</button>
     <button type="button" onClick={() => toggleSection('template')} className={`ml-5 bg-[#1976d2]  rounded-md w-56 h-10  text-center text-gray-50`}>Agregar Citas por template</button>
     <button type="button" onClick={createDateFirebase} className={`ml-5 bg-[#1976d2]  rounded-md w-56 h-10  text-center text-gray-50`}>Save Schedule</button>

    </div>
    <section className={`${showSection.template ? 'lg:grid-cols-3' : 'lg:grid-cols-3'} grid grid-cols-1 md:grid-cols-1 gap-6 pt-7 items-center justify-center`}>
 { showSection.template || showSection.manual?
 <>        
  <div className=''>
          <label>Fecha de programacion:</label>
          <input
            type="date"
            className='w-full border border-gray-400 h-10 rounded-md'
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className=''>
          <label>Interview:</label>
          <select
          className=' w-full border border-gray-400 h-10 rounded-md'
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
        <div className=''>
          <label>Interview Mode:</label>
          <select
  className="w-full border border-gray-400 h-10 rounded-md px-2"
  name="filtro"
  value={filter.valueFilterMode}
  onChange={handleFilter}
  aria-label="Filter interview modality"
>
  <option value="" disabled>
    Select the interview modality
  </option>
  <option value="face-to-face">
    Face to Face
  </option>
  <option value="online">
    Online
  </option>
</select>
        </div>
        
        </>
        :null}

        {
          showSection.template?
          <div className=' pl-2 text-center'>
          <label>Plantilla:</label>
          <select
  className='rounded-lg ml-2'
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
        :null
        }
        
        </section>
  
  <form onSubmit={handleSubmit} className=' text-center'>
 {   showSection.manual?      
( 
<>
<fieldset className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 mb-6 ">
  <legend className='text-center bg-teal-500 w-full p-1 text-gray-50 mb-2'>TIME</legend>
  <div className="col-span-1">
    <label>Duration of the Interview:</label>
    <select
      name="duration"
      value={newEvent.duration}
      required
      onChange={handleInputChange}
      className="mt-1 block w-full border border-gray-400 h-10 rounded-md"
    >
      {durations.map((duration, index) => (
        duration!=""?
        <option key={index} value={duration}>
          {duration} minutes
        </option>
        :<option key={index} value={duration}>
        {duration}
      </option>
      ))}
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
<fieldset className=''>
         <legend className='text-center bg-teal-500 w-full p-1 text-gray-50 mt-2'>STAFF</legend>
         <label className='block pt-4'>Interviewer:</label>
         <div className="grid grid-cols-1 lg:grid-cols-3 border border-gray-500 gap-1 px-5 py-2 justify-center items-center">

    {data.entrevistador.map((interviewer, index) => (
      <div key={index}>
        
          <div className=''>
          <label className='flex gap-2'>
          <input
            type="checkbox"
            name="interviewer"
            value={interviewer.id}
            checked={newEvent.interviewer?.includes(interviewer.id) || false} // Verifica si está seleccionado
            onChange={handleCheckboxChange}
            className={`form-checkbox h-5 w-5 ${
              newEvent.interviewer?.includes(interviewer.id) ? 'text-green-500' : 'text-gray-500'
            }`} // Cambia el color cuando está seleccionado
          />
          {interviewer.displayName}
          </label>
          </div>
        
      </div>
    ))}
  </div>

            </fieldset>
            </>):null}
            {
              showSection.manual||showSection.template ?<button type="submit" className='bg-[#1976d2]  rounded-md w-44 h-10 mt-4 text-center text-gray-50'>Agregar Entrevista</button>:null
            }
         
        </form>

        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          className=""
          style={{height:"100vh"}}
          messages={{
            next: 'Siguiente',
            previous: 'Anterior',
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
          }}
          onSelectEvent={(event) => alert(`Entrevistador: ${event.interviewer}\nUsuario: ${event.interviewee}`)}
        />

    </>
  );
};

export default AgendaForm;
