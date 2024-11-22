import { Table } from "flowbite-react";
import Cookies from 'js-cookie';
import { useState,useEffect } from 'react';
import { ModalYesNo } from "../../components/layoutComponents";
import {
    HiOutlineQuestionMarkCircle,
  } from "react-icons/hi";
import { useSelector } from "react-redux";
export default function InterviewSchedule() {
const [dates,setDates] = useState([])
const [dataValue, setDataValue] = useState('');
const [datesFilter,setdatesFilter] = useState("")
const [isOpen, setIsOpen] = useState(false);
const {userData}=useSelector(state=>state.userData)
    const openModal = () => {
      setIsOpen(true);
    };
    const closeModal = () => setIsOpen(false);

    const handleConfirm = () => {
      /* setDates((prevDates) => {
        return prevDates.map((date, index) => {
          if (index === valueFormEdit.id) {
            return {
              ...date,
              link: valueFormEdit.link
            };
          }
          return date; 
        });
      }); */
      closeModal();
    };
  
    const handleCancel = () => { 
      closeModal();
    };
    useEffect(() => {
        const dates = Cookies.get('events') ? JSON.parse(Cookies.get('events')) : false;
        console.log(dates)
        setDates(dates)
        console.log(userData.role.Id)
      }, []);

      useEffect(() => {
        filtrarPorFecha()
       }, [dates,dataValue.date]);

       function filtrarPorFecha() {
        let fechaFiltro = dataValue.date || "";
      
        const registrosPorUsuario = dates.filter((entrevista) => {
          return entrevista.interviewee === userData.uid;
        });
      
        if (registrosPorUsuario.length > 0) {
          setdatesFilter(registrosPorUsuario);
          return;
        }
      
        if (!fechaFiltro) {
          setdatesFilter({});
          return;
        }
      
        const resultadoFiltrado = dates.filter((entrevista) => {
          if (entrevista.start) {
            const fechaEntrevista = new Date(entrevista.start).toISOString().split('T')[0];
            const cumpleFecha = fechaEntrevista === fechaFiltro;
            return cumpleFecha;
          }
          return false;
        });
      
        setdatesFilter(resultadoFiltrado);
      }

      const handleCancelarCita = () => {
        openModal()
      };

      const reservar = (start, end, interviewer) => {
        setDates((prevDates) => {
          const updatedDates = prevDates.map((date) => {
            console.log(date.status);
            if (date.start === start && date.end === end && date.interviewer === interviewer) {
              return {
                ...date,
                interviewee: userData.uid,
                status: "2", 
              };
            }
            return date;
          });
      
          Cookies.set('events', JSON.stringify(updatedDates), { expires: 7 });
      
          return updatedDates; 
        });
      };
      
      function convertirFecha(date) {
        const fecha = new Date(date); 
        const dia = fecha.getUTCDate();     
        const mes = fecha.getUTCMonth() + 1;
        const ano = fecha.getUTCFullYear();  
        return dia+"-"+mes+"-"+ano      
      }

      function colorButton(id) {
        
        if(id==""){
            return 'bg-green-700'
        }else if (id=="2"){
            return 'bg-yellow-500'
        }    
      }

      function convertirHora(fechaISO) {
        const fecha = new Date(fechaISO);
        let horas = fecha.getUTCHours();
        const minutos = String(fecha.getUTCMinutes()).padStart(2, '0');
        const periodo = horas >= 12 ? 'PM' : 'AM';
        horas = horas % 12 || 12; 
        const horaFormateada = `${horas}:${minutos} ${periodo}`;
        return horaFormateada ;
      }

      const handleChange=((e)=>{
        let updatedData = {
            ...dataValue,
            [e.target.name]: e.target.value,
          };
        setDataValue(updatedData);
      })


      const mostrar=(()=>{
        console.log(dataValue)
        console.log(dates)
      })
  return (
    <>
    <button type="button" onClick={mostrar} className={` bg-[#1976d2]  rounded-md w-44 h-10  text-center text-gray-50`}>Mostrar</button>
    <h1 className='text-center'>Agenda tu Cita</h1>
       <div className='pt-5'>
          <label>Fecha de cita:</label>
          <input
            type="date"
            name='date'
            className=' rounded-lg md:h-6  md:w-48 '
            value={dataValue.date || ""}
            onChange={handleChange}
          />
        </div>
        <p className={`text-center font-semibold text-xl pt-3 ${dataValue.date?"block":"hidden"}`}>Citas del {dataValue.date?convertirFecha(dataValue.date):""}</p>
        <div className="overflow-x-auto pt-6">
{datesFilter ? (
  <Table striped>
    <Table.Head>
      <Table.HeadCell>Asunto</Table.HeadCell>
      <Table.HeadCell>Duration Time</Table.HeadCell>
      <Table.HeadCell>Start Time</Table.HeadCell>
      <Table.HeadCell>End Time</Table.HeadCell>
      <Table.HeadCell></Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
      {datesFilter.length>0? datesFilter.map((event, index) => (
        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell>{event.asunto||""}</Table.Cell>
          <Table.Cell>{event.duration}</Table.Cell>
          <Table.Cell>{convertirHora(event.start)}</Table.Cell>
          <Table.Cell>{convertirHora(event.end)}</Table.Cell>
          <Table.Cell className="flex gap-3">
            <button
              className={`text-gray-50  w-24 h-10 rounded-md ${colorButton(event.status)}`}
              onClick={() => reservar(event.start,event.end,event.interviewer)}
            >
             {event.status==""?'Agendar':'Esperando Aprobacion'}
            </button>
            { event.status=="2"?
            <button
              className={`text-gray-50  w-24 h-10 rounded-md bg-red-700`}
              onClick={handleCancelarCita}
            >
             Cancelar
            </button>
            :""}
          </Table.Cell>
        </Table.Row>
      )) : <Table.Row  className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell colSpan="5" className="text-center"> No se encuentran citas disponibles</Table.Cell>
      
    </Table.Row>}
    </Table.Body>
  </Table>
) : null}
</div>

<ModalYesNo
isOpen={isOpen}
closeModal={closeModal}
 textyes="Si"
 textno="No"
onConfirm={handleConfirm}
onCancel={handleCancel}
classmodal="pt-[50%] md:pt-0"
icon={<HiOutlineQuestionMarkCircle className="w-9 h-9 m-auto" />}
/>
    </>
  )
}
