
import { useState,useEffect}  from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Cookies from 'js-cookie';
const localizer = momentLocalizer(moment);
const interviewers = ["",'Juan Pérez', 'María López', 'Carlos Gómez'];
const interviewees = ["",'Ana García', 'Pedro Rodríguez', 'Luisa Fernández'];
const asunto = ['','Primera Entrevista','Segunda Entrevista']; 
const durations = [0,5, 10, 15, 30];

const AgendaForm = () => {
 
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [template,setTemplate] = useState([])
  const [showSection,setShowSection] = useState({manual:false,template:false})
  const [filter,setFilter] = useState({template:"",filterTemplate:"",valueFilterTemplate:""})
  const [newEvent, setNewEvent] = useState({
    title: '',
    startTime: '',
    endTime: '',
    interview:"",
    interviewer:"",
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
          interviewer: "",
          interviewee: "",
          duration: durations[0],
        });
      }else{
        setFilter({template:"",filterTemplate:"",valueFilterTemplate:""})
      }
  
      return newState;
    });
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  useEffect(() => {
    const value = Cookies.get('myCookie') ? JSON.parse(Cookies.get('myCookie')) : false;
    const storedEvents = Cookies.get('events') ? JSON.parse(Cookies.get('events')) : false;
    
    if (value) {
      setTemplate(value);
    }
  
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);
  
  const filteredEvents = events.filter(event => { 
    const eventDate = moment(event.start).format('YYYY-MM-DD');
    return eventDate === selectedDate && event.interviewee === "";
  });
  

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };


  const handleStartTimeChange = (e) => {
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
  };

  const handleDurationChange = (e) => {
    const { value } = e.target;
    setNewEvent((prevEvent) => {
      return {
        ...prevEvent,
        duration: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!selectedDate) {
      alert("introduzca fecha");
      return;
    }
  
    let updatedDataTemplate = [];
  
    if (filter.template.length == 0) {
      const start = new Date(`${selectedDate}T${newEvent.startTime}`);
      const end = new Date(`${selectedDate}T${newEvent.endTime}`);
      const event = {
        title: `${filter.valueFilterTemplate} (Entrevistador: ${newEvent.interviewer}, Usuario: ${newEvent.interviewee})`,
        asunto:filter.valueFilterTemplate,
        start: start,
        end: end,
        interviewer: newEvent.interviewer,
        interviewee: newEvent.interviewee,
        duration: newEvent.duration,
        status: newEvent.status,
        link: newEvent.link,
      };
  
      setEvents((prevEvents) => {
        updatedDataTemplate = [...prevEvents, event];
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
    console.log(selectedDate)
    console.log(filteredEvents)
    console.log(filter)
  })
  return (
    <>
     <h1 className='text-center font-semibold text-lg mt-5'>Programación de Citas</h1>
     <button type="button" onClick={mostrar} className={` bg-[#1976d2]  rounded-md w-44 h-10  text-center text-gray-50`}>mostrar</button>
     <div className='flex '>
      
        
     <button type="button" onClick={() => toggleSection('manual')} className={` bg-[#1976d2]  rounded-md w-44 h-10  text-center text-gray-50`}>Agregar Citas Manual</button>
     <button type="button" onClick={() => toggleSection('template')} className={`ml-5 bg-[#1976d2]  rounded-md w-56 h-10  text-center text-gray-50`}>Agregar Citas por template</button>
     
    </div>
    <section className={`${showSection.template ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} grid grid-cols-1 md:grid-cols-1 pt-7 items-center justify-center`}>
 { showSection.template || showSection.manual?
 <>        
  <div className=''>
          <label>Fecha de programacion:</label>
          <input
            type="date"
            className=' rounded-lg md:h-6  md:w-48 '
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className=''>
          <label>Interview:</label>
          <select
          className='rounded-lg'
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
  
  <form onSubmit={handleSubmit} className='md:p-4 text-center'>
 {   showSection.manual?      
( 
<>
<fieldset className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4  mt-3">
  <legend className='text-center bg-teal-500 w-full p-1 text-gray-50 mb-2'>Tiempo</legend>
  <div className="col-span-1">
    <label>Duración de la entrevista:</label>
    <select
      name="duration"
      value={newEvent.duration}
      onChange={handleDurationChange}
      className="mt-1 block w-full"
    >
      {durations.map((duration, index) => (
        <option key={index} value={duration}>
          {duration} minutos
        </option>
      ))}
    </select>
  </div>
  <div className="col-span-1">
    <label>Hora de inicio:</label>
    <input
      type="time"
      name="startTime"
      value={newEvent.startTime}
      onChange={handleStartTimeChange}

      className="mt-1 block w-full"
    />
  </div>
  <div className="col-span-1">
    <label>Hora de finalización:</label>
    <input
      type="time"
      name="endTime"
      value={newEvent.endTime}
      readOnly
      className="mt-1 block w-full"
    />
  </div>
</fieldset>
         <fieldset className='grid grid-cols-1 md:grid-cols-2 mt-3 text-center'>
         <legend className='text-center bg-teal-500 w-full p-1 text-gray-50 mb-2'>Personal</legend>
         <div className="">
            <label className='block'>Entrevistador:</label>
            <select
            className='rounded-lg ml-2'
              name="interviewer"
              value={newEvent.interviewer}
              onChange={handleInputChange}
            >
              {interviewers.map((interviewer, index) => (
                <option key={index} value={interviewer}>
                  {interviewer}
                </option>
              ))}
            </select>
              </div>
            <div className="">
            <label className='block'>Usuario a entrevistar:</label>
            <select
            className='rounded-lg ml-2'
              name="interviewee"
              value={newEvent.interviewee}
              onChange={handleInputChange}
            >
              {interviewees.map((interviewee, index) => (
                <option key={index} value={interviewee}>
                  {interviewee}
                </option>
              ))}
            </select>
            </div>
            </fieldset>
            </>):null}
            {
              showSection.manual||showSection.template ?<button type="submit" className='bg-[#1976d2]  rounded-md w-44 h-10 mt-4 text-center text-gray-50'>Agregar Entrevista</button>:null
            }
         
        </form>

        <Calendar
          localizer={localizer}
          events={events}
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
