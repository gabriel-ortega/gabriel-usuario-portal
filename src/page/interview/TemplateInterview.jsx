import { useState}  from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Table } from "flowbite-react";
import { useEffect } from 'react';
import { getInterviewers, getTemplate } from '../../util/services';
import { doc,setDoc} from 'firebase/firestore';
import { FirebaseDB } from '../../config/firebase/config';


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

  const [data,setData]=useState({})

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

  function getNameInterviewer(uid) {
    const result = data.entrevistador.find(item => item.uid === uid);
    return result ? result.displayName : "";
  }

  const loadResults = async () => {
    try {
      const entrevistador = await getInterviewers();
      const template = await getTemplate()
      setDataTemplate(template.data)
      setData(
        {
          ...data,
          entrevistador:entrevistador
        }
      )
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const createTemplateFirebase = async (data) => {
    try {
      const docRef = doc(FirebaseDB, "citas/template");
    const docId = docRef.id;
    await setDoc(docRef, { data:data, id: docId });
      
      console.log("Documento creado con ID:", docId);
    } catch (error) {
      console.error("Error creando el template:", error);
    }
  };



  useEffect(()=>{
   loadResults()
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
          interviewer: "",
          interviewee: '',
          duration: '',
          status: '',
          link: ''
        });
      };

 /*  const mostrar=(()=>{
    console.log(data)
    console.log("----events----")
    console.log(events)
    console.log("----Newevents----")
    console.log(newEvent)
    console.log("----dataTemplate----")
    console.log(dataTemplate)

  }) */

  const save = () => {
    if (events.id) {
      setDataTemplate((prevDataTemplate) => {
        const updatedDataTemplate = prevDataTemplate.map((event) =>
          event.id === events.id
            ? { ...event, nameTemplate: events.nameTemplate, interview: events.interview, dates: events.dates }
            : event
        );
        createTemplateFirebase(updatedDataTemplate)
        return updatedDataTemplate;
      });
    } else {
      let count = 1
      if(dataTemplate.length > 0){

     
     count= dataTemplate.length > 0 ? Math.max(...dataTemplate.map(template => template.id)) + 1 : 1;
    }
      const generateUniqueId = () => {
        while (dataTemplate.some((template) => template.id === count)) {
          count++;
        }
        return count;
      };
      
      // Crear el nuevo objeto con un `id` único
      const newEventsWithId = {
        id: dataTemplate.length > 0?generateUniqueId():count,
        nameTemplate: events.nameTemplate,
        interview: events.interview,
        dates: events.dates,
      };

      setDataTemplate((prevDataTemplate) => {
        const safePrevDataTemplate = Array.isArray(prevDataTemplate) ? prevDataTemplate : [];
        const updatedDataTemplate = [...safePrevDataTemplate, newEventsWithId];
        createTemplateFirebase(Array.isArray(updatedDataTemplate) ? updatedDataTemplate : [updatedDataTemplate]) 
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
      setDataTemplate(updatedDates)
      createTemplateFirebase(Array.isArray(updatedDates) ? updatedDates : [updatedDates])
    }else{
      const updatedDates = events.dates.filter((_, index) => index !== indexToDelete);
      setEvents({ ...events, dates: updatedDates })
    }
  };
  
  const handleEdit = (id) => {
    setCreateTemplate(true)
    const index = dataTemplate.findIndex((template) => template.id === id);

    // Verifica si el elemento existe en el array antes de guardarlo
    if (index !== -1) {
      setEvents(dataTemplate[index]);
    }
  };

  const sortedEvents = [...events.dates].sort((a, b) => {
    const timeA = moment(a.start, 'HH:mm');
    const timeB = moment(b.start, 'HH:mm');
    return timeA - timeB; 
  });

  return (
    <>

     <h1 className='text-center font-semibold text-lg mt-5'>Template Programming</h1>
    {/*  <button type="submit" onClick={mostrar} className={` bg-[#1976d2]  rounded-md w-44 h-10 mt-4 text-center text-gray-50`}>mostrar</button> */}
     <button type="submit" onClick={handleChangeCreate} className={`${createTemplate?"hidden":"block"} bg-[#1976d2]  rounded-md w-44 h-10 mt-4 text-center text-gray-50`}>Create template</button>
    { createTemplate?
    <form onSubmit={handleSubmit} className='md:p-4 text-center'>
          <fieldset className=' grid grid-cols-1 lg:grid-cols-2 items-center gap-6'>
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
      className="rounded-md disabled:opacity-30 w-full border border-gray-400 h-10 "
    />
  </div>
  <div className="col-span-1">
    <label>Subject:</label>
    <select
          className='rounded-lg disabled:opacity-30 w-full border border-gray-400 h-10'
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
  <legend className='text-center bg-teal-500 w-full p-1 text-gray-50 mb-2'>TIME</legend>
  <div className="col-span-1">
    <label>Duration of the Interview:</label>
    <select
      name="duration"
      value={newEvent.duration}
      required
      onChange={handleDurationChange}
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
      onChange={handleStartTimeChange}
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
      readOnly
      className="mt-1 block w-full border border-gray-400 h-10 rounded-md p-2"
    />
  </div>
</fieldset>
         <fieldset className='grid grid-cols-1 md:grid-cols-2 mt-3 text-center'>
         <legend className='text-center bg-teal-500 w-full p-1 text-gray-50 mb-2'>STAFF</legend>
         <div className="">
            <label className='block'>Interviewer:</label>
            <select
            className='rounded-md  border border-gray-400 h-10 w-full lg:w-52'
              name="interviewer"
              required
              value={newEvent.interviewer}
              onChange={handleInputChange}
            >
              <option value=""></option>
              {data.entrevistador.map((interviewer, index) => (
                <option key={index} value={interviewer.uid}>
                  {interviewer.displayName}
                </option>
              ))}
            </select>
              </div>
            </fieldset>
          <div className='flex flex-col items-center lg:flex-row justify-center gap-5 pt-7'>
          <button type="submit" className='bg-green-500  rounded-md w-44 h-10  text-center text-gray-50'>Agregar Horario</button>
          <button type="button" onClick={save} disabled={events.dates.length>0 ?false:true}  className='bg-[#1976d2]  rounded-md w-44 h-10  text-center text-gray-50 disabled:opacity-65'>Guardar Plantilla</button>
          <button type="button" onClick={handleChangeCreate} className='bg-red-500  rounded-md w-44 h-10  text-center text-gray-50 disabled:opacity-65'>Cancelar Plantilla</button>
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
          <Table.Cell>{getNameInterviewer(event.interviewer)}</Table.Cell>
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
              onClick={() => handleDelete(templateData.id,"template")}>
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
