import { useEffect,useState } from 'react'
import { Table } from "flowbite-react";
import { ModalYesNo } from '../../components/layoutComponents/ModalYesNo';
import {
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";
import { DatepickerComponent, InputText, SelectComponents } from '../../components/layoutComponents';
import { downloadExcel, getDateInterviews, getInterviewers } from '../../util/services';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getSeafarerData, getUserData } from '../../store/userData';
import { doc, setDoc } from 'firebase/firestore';
import { FirebaseDB } from '../../config/firebase/config';

export default function EditDates() {
  const dispatch = useDispatch();
  const {profile} = useSelector(state=>state.currentViews)

  
    const [dates,setDates] = useState([])
    const [dataValue,setDataValue] = useState("")
    const [datesFilter,setdatesFilter] = useState("")
    const [valueFormEdit,setValueFormEdit] = useState({})
    const [interviewer,setInterviewer] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [interviewFilter,setInterviewFilter]=useState({interviewer:[]})
    const openModal = () => {
      setIsOpen(true);

    };
    const closeModal = () => setIsOpen(false);

    const handleConfirm = () => {
      // Calcula las fechas actualizadas antes de llamar a setDates
      const updatedDates = dates.map((date) => {
        if (date.id === valueFormEdit.id) {
          return {
            ...date,
            asunto: valueFormEdit.asunto,
            link: valueFormEdit.link,
            interviewer: valueFormEdit.interviewer,
            status: valueFormEdit.status,
            mode: valueFormEdit.mode,
          };
        }
        return date;
      });
    
      // Actualiza el estado con las fechas modificadas
      setDates(updatedDates);
    
      // Llama a createDateFirebase con las fechas actualizadas
      createDateFirebase(updatedDates);
    
      // Cierra el modal
      closeModal();
    };

    const createDateFirebase = async (data) => {
      try {
        const docRef = doc(FirebaseDB, "citas/dates"); 
      const docId = docRef.id;
      const eventsString = JSON.stringify(data);
      await setDoc(docRef, { data:eventsString, id: docId });
    
        console.log("Documento creado con ID:", docId);
      } catch (error) {
        console.error("Error creando el dates:", error);
      }
    };

    function getNameInterviewer(uid) {
      const result = interviewer.find(item => item.uid === uid);
      return result ? result.displayName : "";
    }


    const handleDowloadExcelSchedule = async () => { 
      try {
        const transformedData = datesFilter.map(item => {
          const startDate = new Date(item.start); // Convertir a objeto Date
          const endDate = new Date(item.end);
    
          // Formatear la fecha como MM/DD/YYYY
          const formattedDate = `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`;
    
          return {
            stage: item.asunto,
            duration: item.duration[0], // Usamos el primer valor del array
            Date: formattedDate, // Fecha formateada como MM/DD/YYYY
            startTime: startDate.toLocaleTimeString(), // Hora inicial
            endTime: endDate.toLocaleTimeString(), // Hora final
            interview: getNameInterviewer(item.interviewer),
            Mode: item.mode,
            Status: item.status,
            interviewee:"",
            vessel:"",
            position:"",
            department:"",
            identification:"",
            nationality:"",
            residency:""
          };
        });
    
        // Llamar a la función de descarga con los datos transformados
        await downloadExcel(transformedData, "schedulecompleted", "Schedule Completed");
      } catch (error) {
        console.error("Error al descargar el reporte:", error.message);
      }
    };
  
    const handleCancel = () => {
      setValueFormEdit({

      })
      closeModal();
    };

    useEffect(() => {
      loadResults()
      
    }, []);


    const handleCleanFilter=()=>{
setDataValue({mode:"",dateI:"",dateF:"",asunto:""})
setdatesFilter(dates)
setInterviewFilter({interviewer:[]})
    }

    const loadResults = async () => {
      try {
        const entrevistador = await getInterviewers();
        const dates = await getDateInterviews();
        let data=[];
      let transformedData = [];
  
      // Validar y transformar los datos recibidos
      if (dates && dates.data) {
         data = JSON.parse(dates.data);
        // Convertir fechas a objetos Date
        transformedData = data.map((item) => ({
          ...item,
          start: new Date(item.start), // Convertir `start` a Date
          end: new Date(item.end),     // Convertir `end` a Date
        }));
      }
    
        // Actualizar los estados
        setDates(transformedData);
       setInterviewer(entrevistador)
       filterInterviews(transformedData)
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };


    const normalizeDate = (dateString) => {
      const [year, month, day] = dateString.split("-").map(Number);
      return new Date(year, month - 1, day); // Meses en JavaScript son 0-indexados
    };

      const filterInterviews = (datesArray) => {
        setdatesFilter(
          datesArray.filter(interview => {
            const matchesInterviewer = interviewFilter.interviewer && interviewFilter.interviewer.length
              ? interviewFilter.interviewer.includes(interview.interviewer)
              : true;
              const matchesStart = dataValue.dateI
              ? new Date(interview.start).setHours(0, 0, 0, 0) >= normalizeDate(dataValue.dateI).setHours(0, 0, 0, 0)
              : true;
              const matchesEnd = dataValue.dateF
              ? new Date(interview.end).setHours(0, 0, 0, 0) <= normalizeDate(dataValue.dateF).setHours(0, 0, 0, 0)
              : true;
        
            const matchesMode = dataValue.mode
              ? interview.mode === dataValue.mode
              : true;

              const matchesAsunto = dataValue.asunto
              ? interview.asunto === dataValue.asunto
              : true;
        
            return matchesInterviewer && matchesStart && matchesEnd && matchesMode && matchesAsunto;
          })
        );
      };
      

useEffect(()=>{
  console.log(profile)
},[profile])
      useEffect(() => {
        filterInterviews(dates)
      }, [dataValue.dateI,dataValue.dateF,dataValue.mode,dataValue.asunto,interviewFilter.interviewer]);
      
      function convertirFechaYHora(fechaISO) {
        const fecha = new Date(fechaISO);
      
        // Extraer los componentes de la fecha en hora local
        const dia = String(fecha.getDate()).padStart(2, '0'); // Día del mes
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes (de 0 a 11, por eso +1)
        const anio = fecha.getFullYear(); // Año completo
      
        // Extraer los componentes de la hora en hora local
        let horas = fecha.getHours(); // Hora local
        const minutos = String(fecha.getMinutes()).padStart(2, '0'); // Minutos
        const periodo = horas >= 12 ? 'PM' : 'AM'; // Determinar AM o PM
        horas = horas % 12 || 12; // Convertir a formato de 12 horas (0 -> 12)
      
        // Formatear fecha y hora
        const fechaFormateada = `${dia}/${mes}/${anio}`;
        const horaFormateada = `${horas}:${minutos} ${periodo}`;
      
        return `${fechaFormateada} ${horaFormateada}`;
      }
      

     const handleChange=((e)=>{
      console.log(e)
        let updatedData = {
            ...dataValue,
            [e.target.name]: e.target.value,
          };
        setDataValue(updatedData);
        
      })
   
      const handleDelete = (indexToDelete) => {
        const updatedDates = dates.filter((index) => index.id !== indexToDelete);
        setDates(updatedDates);
        createDateFirebase(updatedDates)
        filterInterviews(updatedDates)
      };

      const handleEdit = (indexToEdit) => {
        const editDates = dates.filter((index) => index.id == indexToEdit);
        if(editDates[0].interviewee){
          dispatch(getSeafarerData(editDates[0].interviewee))
        }
        
        console.log(editDates[0].interviewee)
        setValueFormEdit(
          {
            id:editDates[0].id,
            asunto:editDates[0].asunto,
            link:editDates[0].link,
            startTime:convertirFechaYHora(editDates[0].start),
            endTime:convertirFechaYHora(editDates[0].end),
            interviewer:editDates[0].interviewer,
            interviewee:  editDates[0].interviewee,
            status:editDates[0].status,
            mode:editDates[0].mode,

          }
        )

        
        openModal()
      };


      /* const getNameUser = (uid) => {
        // Despacha la acción para obtener los datos del marinero
        dispatch(getSeafarerData("YGHU9jxUwgZMjYpDYfQh1yaEa3s2"));
    
        // Verifica si los datos están disponibles y concatena el nombre o retorna ""
        const firstName = profile?.seafarerData?.seafarerProfile?.profile?.firstName || "";
        const lastName = profile?.seafarerData?.seafarerProfile?.profile?.lastName || "";
    
        const name = firstName + " " + lastName;
    
        return name;
    } */

      const mostrar=(()=>{
        console.log(dataValue)
        console.log(dates)
        console.log(profile)
        console.log(datesFilter)
        console.log(valueFormEdit)
      })


      const changeData = (e) => {
        let updatedData = {
          ...valueFormEdit,
          [e.target.name]: e.target.value,
        };
     
          setValueFormEdit(updatedData);
        };

        const handleCheckboxChangeFilter = (e) => {
          const { value, checked } = e.target;
          setInterviewFilter((prevEvent) => {
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
  return (
    <>
    <button type="button" onClick={mostrar} className={` bg-[#1976d2]  rounded-md w-44 h-10  text-center text-gray-50`}>Mostrar</button>
       
   <button
          onClick={handleDowloadExcelSchedule}
          className="md:w-32 md:h-10 bg-green-600 text-center text-sm rounded-md text-white "
        >
          Export to Excel
        </button>
       
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10  items-center justify-center'>
       <div>
       <p className='text-sm text-gray-400 pb-2'>Interview Stage:</p>
       <SelectComponents
            name={"asunto"}
            initialValue={dataValue.asunto}
            Text="Interview Stage"
            className={""}
            data={[{id:1,name:"First Interview"},{id:2,name:"Second Interview"}]}
            idKey="name"
            valueKey="name"
            onChange={handleChange}
           
            
          />
          </div>
       <div>
        <p className='text-sm text-gray-400 pb-2'>Interview Mode:</p>
       <SelectComponents
            name={"mode"}
            initialValue={dataValue.mode}
            /* valueDefault={"Interview Mode:"} */
            label={"Interview Mode"}
            Text="Interview Mode:"
            className={""}
            data={[{id:1,name:"Face To Face"},{id:2,name:"Online"}]}
            idKey="name"
            valueKey="name"
            onChange={handleChange}
           
            
          />
          </div>

          <DatepickerComponent 
            classnamedate=""
            label="Start Date"
            classnamelabel="-translate-y-5"
            datevalue={dataValue.dateI || ""} 
            name="dateI"
            onChange={handleChange}
          />
          <DatepickerComponent 
            classnamedate=""
            label="End Date:"
            classnamelabel="-translate-y-5"
            datevalue={dataValue.dateF || ""} 
            name="dateF"
            onChange={handleChange}
          />
          
        </div>

        <div>
        <label className='block pt-4'>Interviewer:</label>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 border border-gray-500 gap-1 px-5 py-2 justify-center items-center">
{interviewer.map((interviewer, index) => (
  <div key={index}>
    
      <div className=''>
      <label className='flex gap-2'>
      <input
        type="checkbox"
        name="interviewer"
        value={interviewer.id}
        checked={interviewFilter.interviewer?.includes(interviewer.id) || false} // Verifica si está seleccionado
        onChange={handleCheckboxChangeFilter}
        className={`form-checkbox h-5 w-5 ${
          interviewFilter.interviewer?.includes(interviewer.id) ? 'text-green-500' : 'text-gray-500'
        }`} // Cambia el color cuando está seleccionado
      />
      {interviewer.displayName}
      </label>
      </div>
    
  </div>
))}
</div>
</div>
        <button onClick={handleCleanFilter} className='mt-2 w-36 text-center rounded-md bg-gray-400 text-white h-10'>clean filter</button>
        <div className="overflow-x-auto pt-10">
{datesFilter.length > 0 ? (
  <Table striped>
    <Table.Head>
      <Table.HeadCell>Mode</Table.HeadCell>
      <Table.HeadCell>Duration Time</Table.HeadCell>
      <Table.HeadCell>Start Time</Table.HeadCell>
      <Table.HeadCell>End Time</Table.HeadCell>
      <Table.HeadCell>Interviewer</Table.HeadCell>
      <Table.HeadCell></Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
    {datesFilter
  .sort((a, b) => new Date(b.start) - new Date(a.start)) // Ordenar de mayor a menor por `start`
  .map((event, index) => ( 
    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{event.asunto || ""}</Table.Cell>
      <Table.Cell>{event.duration || ""}</Table.Cell>
      <Table.Cell>{convertirFechaYHora(event.start)}</Table.Cell>
      <Table.Cell>{convertirFechaYHora(event.end)}</Table.Cell>
      <Table.Cell>{getNameInterviewer(event.interviewer)}</Table.Cell>
      <Table.Cell>
        <button
          className="text-green-700 hover:underline"
          onClick={() => handleEdit(event.id)}
        >
          Edit
        </button>
      </Table.Cell>
      <Table.Cell>
        <button
          className="text-red-600 hover:underline"
          onClick={() => handleDelete(event.id)} 
        >
          Delete
        </button>
      </Table.Cell>
    </Table.Row>
  ))}
    </Table.Body>
  </Table>
) : null}
</div>
<ModalYesNo
        isOpen={isOpen}
        closeModal={closeModal}
         textyes="editar"
         textno="cancelar"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        classmodal=" md:pt-0"
        size='4xl'
        icon={<HiOutlineQuestionMarkCircle className="w-9 h-9 m-auto" />}
>

  <form className=' pb-5 grid grid-cols-1 lg:grid-cols-2 gap-5'>
    {/* <InputText labelinput='Asunto' value={valueFormEdit.asunto} name="asunto" onChange={changeData}/> */}
    <SelectComponents
            name={"asunto"}
            initialValue={valueFormEdit.asunto}
            valueDefault={"Interview Stage:"}
            Text="Interview Stage"
            className={""}
            data={[{id:1,name:"First Interview"},{id:2,name:"Second Interview"}]}
            idKey="name"
            valueKey="name"
            onChange={changeData}
           
            
          />
    <InputText labelinput='Link' value={valueFormEdit.link} name="link" onChange={changeData}/>
    <InputText labelinput='Start Time' value={valueFormEdit.startTime} read={true} name="startTime" onChange={changeData}  />
    <InputText labelinput='End Time' value={valueFormEdit.endTime} read={true} name="endTime" onChange={changeData} />
    <SelectComponents
            name={"interviewer"}
            initialValue={valueFormEdit.interviewer}
            valueDefault={"Interviewer"}
            Text="Interviewer"
            className={""}
            data={interviewer}
            idKey="id"
            valueKey="displayName"
            onChange={changeData} 
          />
    <InputText
  labelinput="Interviewee"
  read={true}
  value={
    profile?.seafarerData?.seafarerProfile?.profile?.firstName && profile?.seafarerData?.seafarerProfile?.profile?.lastName
      ? `${profile.seafarerData.seafarerProfile.profile.firstName} ${profile.seafarerData.seafarerProfile.profile.lastName}`
      : "" // Si alguno de los dos valores está vacío, muestra una cadena vacía
  }
  onChange={changeData}
  name="interviewee"
/>

    <SelectComponents
            name={"status"}
            initialValue={valueFormEdit.status}
            valueDefault={"Status:"}
            Text="Status"
            className={""}
            data={[{id:1,name:"Canceled"},{id:2,name:"Pending"},{id:3,name:"Completed"}]}
            idKey="name"
            valueKey="name"
            onChange={changeData}
           
            
          />
       <SelectComponents
            name={"mode"}
            initialValue={valueFormEdit.mode}
            valueDefault={"Interview Mode:"}
            Text="Mode"
            className={""}
            data={[{id:1,name:"Face To Face"},{id:2,name:"Online"}]}
            idKey="name"
            valueKey="name"
            onChange={changeData}
           
            
          />
   
  </form>
</ModalYesNo>
    </>
  )
}
