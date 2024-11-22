import { useState}  from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Table } from "flowbite-react";
import Cookies from 'js-cookie';
import { useEffect } from 'react';
const interviewers = ["",'Juan Pérez', 'María López', 'Carlos Gómez'];
const asunto = ['','Primera Entrevista','Segunda Entrevista'];
const durations = ["",5, 10, 15, 30];
export default function TemplateInterview() {
  const [dataTemplate, setDataTemplate] = useState([]);
  const [createTemplate,setCreateTemplate]=useState(false)
  const [events, setEvents] = useState({nameTemplate:"",interview:"",dates:[]});
  const [newEvent, setNewEvent] = useState({
    title: '',
    startTime: '',
    endTime: '',
    interviewer:"",
    interviewee:"",
    duration:"",
    status:"",
    link:""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name=="nameTemplate" || name=="title"){
        setEvents((prevEvent) => ({
            ...prevEvent,
            [name=="title"?"interview":name]: value,
          }));
    }
    
    if(name!="nameTemplate")
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

 useEffect(()=>{
  const value = Cookies.get('myCookie')?JSON.parse(Cookies.get('myCookie')):false;
 
    if (value) {
      setDataTemplate(value)
    }
},[]) 

  const handleChangeCreate= () => {
    setCreateTemplate(!createTemplate)
  };

  const handleStartTimeChange = (e) => {
    const { value } = e.target; 
    setNewEvent((prevEvent) => {
      const start = moment(value, 'HH:mm'); 
      if (!start.isValid()) {
        console.error("El formato de hora de inicio es inválido");
        return prevEvent;
      }
  
    const end = start.clone().add(prevEvent.duration, 'minutes');
      return {
        ...prevEvent,
        startTime: value,
        endTime: end.format('HH:mm'),
      };
    });
  };
  
  
    const handleDurationChange = (e) => {
      const { value } = e.target;
      setNewEvent((prevEvent) => {
        const start = moment(prevEvent.startTime, 'HH:mm'); 
        const end = start.clone().add(parseInt(value), 'minutes'); 
        return {
          ...prevEvent,
          duration: value,
          endTime: end.isValid() ? end.format('HH:mm') : '', 
        };
      });
    };
  
  

    const handleSubmit = (e) => {
        e.preventDefault();
        const start = newEvent.startTime;
        const end = newEvent.endTime;
        const title = newEvent.title || events.interview;
        const duration = newEvent.duration;
      
        const event = {
          title: title,
          start: start,
          end: end,
          interviewer: newEvent.interviewer,
          interviewee: newEvent.interviewee,
          duration: duration,
          status:"",
          link: ""
        };
      
        setEvents((prevEvents) => ({
          ...prevEvents,
          dates: [...prevEvents.dates, event]
        }));
      
        setNewEvent({
          title: title,
          startTime: '',
          endTime: '',
          interviewer: interviewers[0],
          interviewee: '',
          duration: '',
          status: '',
          link: ''
        });
      };

  const mostrar=(()=>{
    console.log("----events----")
    console.log(events)
    console.log("----Newevents----")
    console.log(newEvent)
    console.log("----dataTemplate----")
    console.log(dataTemplate)
    const value = JSON.parse(Cookies.get('myCookie'));

    if (value) {
      console.log(value)
    } else {
      alert('No hay cookies guardadas.');
    }
  })

  const save = () => {
    if (events.id) {
      setDataTemplate((prevDataTemplate) => {
        const updatedDataTemplate = prevDataTemplate.map((event) =>
          event.id === events.id
            ? { ...event, nameTemplate: events.nameTemplate, interview: events.interview, dates: events.dates }
            : event
        );
        Cookies.set('myCookie', JSON.stringify(updatedDataTemplate), { expires: 7 });
        return updatedDataTemplate;
      });
    } else {
      let count = dataTemplate.length + 1;
      const newEventsWithId = {
        id: count,
        nameTemplate: events.nameTemplate,
        interview: events.interview,
        dates: events.dates
      };
      setDataTemplate((prevDataTemplate) => {
        const updatedDataTemplate = [...prevDataTemplate, newEventsWithId];
        Cookies.set('myCookie', JSON.stringify(updatedDataTemplate), { expires: 7 });
        return updatedDataTemplate;
      });
    }
  
    setEvents({ nameTemplate: "", interview: "", dates: [] });
    setCreateTemplate(false);
  };

  const getStartTime = (templateArray) => {
    return templateArray.reduce((earliest, event) => 
      moment(event.start, 'HH:mm').isBefore(moment(earliest, 'HH:mm')) ? event.start : earliest, templateArray[0].start);
  };

  const getEndTime = (templateArray) => {
    return templateArray.reduce((latest, event) => 
      moment(event.end, 'HH:mm').isAfter(moment(latest, 'HH:mm')) ? event.end : latest, templateArray[0].end);
  };

  const getTotalDuration = (templateArray) => {
    const totalMinutes = templateArray.reduce((sum, event) => sum + parseInt(event.duration), 0);
    
    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return minutes > 0 ? `${hours} horas y ${minutes} minutos` : `${hours} horas`;
    } else {
      return `${totalMinutes} minutos`;
    }
  };

  function convertToHourFormat(time) {
    let [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, '0')}${period}`;
  }

  const handleDelete = (indexToDelete,nameTable) => {
    if(nameTable==="template"){
      const updatedDates = dataTemplate.filter((template) => template.id != indexToDelete);
      setDataTemplate(updatedDates);
    }else{
      const updatedDates = events.dates.filter((_, index) => index !== indexToDelete);
      setEvents({ ...events, dates: updatedDates });
    }
  };
  
  const handleEdit = (id) => {
    setCreateTemplate(true)
    setEvents(dataTemplate[id-1])
  };

  const sortedEvents = [...events.dates].sort((a, b) => {
    const timeA = moment(a.start, 'HH:mm');
    const timeB = moment(b.start, 'HH:mm');
    return timeA - timeB; 
  });

  return (
    <>
     <h1 className='text-center font-semibold text-lg mt-5'>Programación de Plantilla</h1>
     <button type="submit" onClick={mostrar} className={` bg-[#1976d2]  rounded-md w-44 h-10 mt-4 text-center text-gray-50`}>mostrar</button>
     <button type="submit" onClick={handleChangeCreate} className={`${createTemplate?"hidden":"block"} bg-[#1976d2]  rounded-md w-44 h-10 mt-4 text-center text-gray-50`}>Crear plantilla</button>
    { createTemplate?
    <form onSubmit={handleSubmit} className='md:p-4 text-center'>
          <fieldset className=' grid grid-cols-2 items-center'>
          <div className="col-span-1">
    <label>Name Template:</label>
    <input
      type="text"
      name="nameTemplate"
      value={events.nameTemplate}
      autoComplete="off"
      onChange={handleInputChange}
      required
      disabled={events.dates.length>0?true:false}
      className="rounded-md h-8 ml-3 disabled:opacity-30"
    />
  </div>
  <div className="col-span-1">
    <label>Asunto:</label>
    <select
          className='rounded-lg ml-2 disabled:opacity-30'
              name="title"
              required
              disabled={events.dates.length>0?true:false}
              value={events.interview}
              onChange={handleInputChange}
            >
              {asunto.map((title, index) => (
                <option key={index} value={title}>
                  {title}
                </option>
              ))}
    </select>
  </div>
          </fieldset>
 <fieldset className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4  mt-3">
  <legend className='text-center bg-teal-500 w-full p-1 text-gray-50 mb-2'>Tiempo</legend>
  <div className="col-span-1">
    <label>Duración de la entrevista:</label>
    <select
      name="duration"
      value={newEvent.duration}
      required
      onChange={handleDurationChange}
      className="mt-1 block w-full"
    >
      {durations.map((duration, index) => (
        duration!=""?
        <option key={index} value={duration}>
          {duration} minutos
        </option>
        :<option key={index} value={duration}>
        {duration}
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
      required
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
              required
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
            </fieldset>
          <div className='flex items-center justify-center gap-5 pt-7'>
          <button type="submit" className='bg-[#1976d2]  rounded-md w-44 h-10  text-center text-gray-50'>Agregar Horario</button>
          <button type="button" onClick={save}  className='bg-[#1976d2]  rounded-md w-44 h-10  text-center text-gray-50 '>Guardar Plantilla</button>
          <button type="button" onClick={handleChangeCreate} className='bg-[#1976d2]  rounded-md w-44 h-10  text-center text-gray-50 '>Cancelar Plantilla</button>
          </div>
          
        </form>
        :null}

<div className="overflow-x-auto">
{sortedEvents.length > 0 && createTemplate ? (
  <Table striped>
    <Table.Head>
      <Table.HeadCell>Asunto</Table.HeadCell>
      <Table.HeadCell>Duration Time</Table.HeadCell>
      <Table.HeadCell>Start Time</Table.HeadCell>
      <Table.HeadCell>End Time</Table.HeadCell>
      <Table.HeadCell>Interviewer</Table.HeadCell>
      <Table.HeadCell></Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
      {sortedEvents.map((event, index) => (
        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell>{event.title}</Table.Cell>
          <Table.Cell>{event.duration}</Table.Cell>
          <Table.Cell>{convertToHourFormat(event.start)}</Table.Cell>
          <Table.Cell>{convertToHourFormat(event.end)}</Table.Cell>
          <Table.Cell>{event.interviewer}</Table.Cell>
          <Table.Cell>
            <button
              className="text-red-600 hover:underline"
              onClick={() => handleDelete(index,"dates")}
            >
              Delete
            </button>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
) : null}

{dataTemplate.length > 0 && !createTemplate ? (
  <Table striped>
    <Table.Head>
      <Table.HeadCell>No</Table.HeadCell>
      <Table.HeadCell>ID</Table.HeadCell>
      <Table.HeadCell>Name Template</Table.HeadCell>
      <Table.HeadCell>Interview</Table.HeadCell>
      <Table.HeadCell>Hours Start</Table.HeadCell>
      <Table.HeadCell>Hours End</Table.HeadCell>
      <Table.HeadCell>Cant. Citas disponible</Table.HeadCell>
      <Table.HeadCell>Horas Total</Table.HeadCell>
      <Table.HeadCell></Table.HeadCell>
      <Table.HeadCell></Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
      {dataTemplate.map((templateData, index) => (
        <Table.Row key={templateData.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell>{index + 1}</Table.Cell>
          <Table.Cell>{templateData.id}</Table.Cell>
          <Table.Cell>{templateData.nameTemplate}</Table.Cell>
          <Table.Cell>{templateData.interview}</Table.Cell>
          <Table.Cell>{getStartTime(templateData.dates)}</Table.Cell>
          <Table.Cell>{getEndTime(templateData.dates)}</Table.Cell>
          <Table.Cell>{templateData.dates.length}</Table.Cell>
          <Table.Cell>{getTotalDuration(templateData.dates)}</Table.Cell>
          <Table.Cell>
          <button
              className="text-green-600 hover:underline"
              onClick={() => handleEdit(templateData.id)}
            >
              Edit
            </button>
          </Table.Cell>
          <Table.Cell>
            <button
              className="text-red-600 hover:underline"
              onClick={() => handleDelete(index,"template")}>
              Delete
            </button>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
) : null}


</div>
    </>
  )
}
