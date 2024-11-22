import { useEffect,useState } from 'react'
import Cookies from 'js-cookie';
import { Table } from "flowbite-react";
import { ModalYesNo } from '../../components/layoutComponents/ModalYesNo';
import {
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";
import { InputText } from '../../components/layoutComponents';
export default function EditDates() {
    const [dates,setDates] = useState([])
    const [dataValue,setDataValue] = useState("")
    const [datesFilter,setdatesFilter] = useState("")
    const [valueFormEdit,setValueFormEdit] = useState({})
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
      setIsOpen(true);
    };
    const closeModal = () => setIsOpen(false);

    const handleConfirm = () => {
      setDates((prevDates) => {
        return prevDates.map((date, index) => {
          if (index === valueFormEdit.id) {
            return {
              ...date,
              link: valueFormEdit.link
            };
          }
          return date; 
        });
      });
    
      closeModal();
    };
  
    const handleCancel = () => {
      setValueFormEdit({

      })
      closeModal();
    };

    useEffect(() => {
      const dates = Cookies.get('events') ? JSON.parse(Cookies.get('events')) : false;
      setDates(dates)
    }, []);

    function filtrarPorRangoDeFechas() {
        let fechaInicioFiltro = dataValue.dateI || ""; 
        let fechaFinalFiltro = dataValue.dateF || ""; 

        if (!fechaInicioFiltro && !fechaFinalFiltro) {
          setdatesFilter(dates);
          return; 
        }
      
        const resultadoFiltrado = dates.filter(entrevista => {
          if (entrevista.start && entrevista.end) {
            const fechaInicioEntrevista = new Date(entrevista.start).getTime();
            const fechaFinalEntrevista = new Date(entrevista.end).getTime();
            const fechaInicioFiltroFormat = fechaInicioFiltro ? new Date(fechaInicioFiltro + "T00:00:00.000Z").getTime() : null;
            const fechaFinalFiltroFormat = fechaFinalFiltro ? new Date(fechaFinalFiltro + "T23:59:59.999Z").getTime() : null;
            if (fechaInicioFiltroFormat && fechaFinalFiltroFormat) {
              return fechaInicioEntrevista >= fechaInicioFiltroFormat && fechaFinalEntrevista <= fechaFinalFiltroFormat;
            }
      
            if (fechaInicioFiltroFormat) {
              return fechaInicioEntrevista >= fechaInicioFiltroFormat;
            }
      
            if (fechaFinalFiltroFormat) {
              return fechaFinalEntrevista <= fechaFinalFiltroFormat;
            }
          }
          return false;
        });
      
        setdatesFilter(resultadoFiltrado);
      }
      


      useEffect(() => {
       filtrarPorRangoDeFechas()
      }, [dates,dataValue.dateI,dataValue.dateF]);
      
      function convertirFechaYHora(fechaISO) {
        const fecha = new Date(fechaISO);
        const dia = String(fecha.getUTCDate()).padStart(2, '0');
        const mes = String(fecha.getUTCMonth() + 1).padStart(2, '0'); 
        const anio = fecha.getUTCFullYear();
        let horas = fecha.getUTCHours();
        const minutos = String(fecha.getUTCMinutes()).padStart(2, '0');
        const periodo = horas >= 12 ? 'PM' : 'AM';
        horas = horas % 12 || 12; 
        const fechaFormateada = `${dia}/${mes}/${anio}`;
        const horaFormateada = `${horas}:${minutos} ${periodo}`;
        return fechaFormateada + " "+ horaFormateada ;
      }

     const handleChange=((e)=>{
        let updatedData = {
            ...dataValue,
            [e.target.name]: e.target.value,
          };
        setDataValue(updatedData);
      })
   
      const handleDelete = (indexToDelete) => {
        const updatedDates = dates.filter((_, index) => index !== indexToDelete);
        setDates(updatedDates);
      };

      const handleEdit = (indexToEdit) => {
        const editDates = dates.filter((_, index) => index == indexToEdit);
        setValueFormEdit(
          {
            id:indexToEdit,
            asunto:editDates[0].title,
            link:editDates[0].link,
            startTime:convertirFechaYHora(editDates[0].start),
            endTime:convertirFechaYHora(editDates[0].end),
            interviewer:editDates[0].interviewer
          }
        )
        openModal()
      };

      const mostrar=(()=>{
        console.log(dataValue)
        console.log(dates)
      })

      const changeData = (e) => {
        let updatedData = {
          ...valueFormEdit,
          [e.target.name]: e.target.value,
        };
     
          setValueFormEdit(updatedData);
        };

   
  return (
    <>
    <button type="button" onClick={mostrar} className={` bg-[#1976d2]  rounded-md w-44 h-10  text-center text-gray-50`}>Mostrar</button>
    <button type="button" onClick={filtrarPorRangoDeFechas} className={` bg-[#1976d2]  rounded-md w-44 h-10  text-center text-gray-50`}>hol</button>
       <div className=''>
          <label>Fecha de programacion:</label>
          <input
            type="date"
            name='dateI'
            className=' rounded-lg md:h-6  md:w-48 '
             value={dataValue.dateI || ""} 
            onChange={handleChange}
          />
        </div>
        <div className=''>
          <label>Fecha de programacion:</label>
          <input
            type="date"
            name='dateF'
            className=' rounded-lg md:h-6  md:w-48 '
             value={dataValue.dateF || ""} 
            onChange={handleChange}
          />
        </div>

        <div className="overflow-x-auto">
{datesFilter.length > 0 ? (
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
      {datesFilter.map((event, index) => (
        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell>{event.asunto|| ""}</Table.Cell>
          <Table.Cell>{event.duration || ""}</Table.Cell>
          <Table.Cell>{convertirFechaYHora(event.start)}</Table.Cell>
          <Table.Cell>{convertirFechaYHora(event.end)}</Table.Cell>
          <Table.Cell>{event.interviewer}</Table.Cell>
          <Table.Cell>
            <button
              className="text-green-700 hover:underline"
               onClick={()=> handleEdit(index)}
            >
              Edit
            </button>
          </Table.Cell>
          <Table.Cell>
            <button
              className="text-red-600 hover:underline"
               onClick={() => handleDelete(index)} 
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
        classmodal="pt-[50%] md:pt-0"
        icon={<HiOutlineQuestionMarkCircle className="w-9 h-9 m-auto" />}
>
  <form className=' pb-5'>
    <InputText labelinput='asunto' value={valueFormEdit.asunto || ""} name="asunto" onChange={changeData}/>
    <InputText labelinput='link' value={valueFormEdit.link || ""} name="link" onChange={changeData}/>
    <InputText labelinput='Start Time' value={valueFormEdit.startTime || ""} read={true} name="startTime" onChange={changeData}  />
    <InputText labelinput='End Time' value={valueFormEdit.endTime || ""} read={true} name="endTime" onChange={changeData} />
    <InputText labelinput='Interviewer' value={valueFormEdit.interviewer || ""} read={true} name="interview" onChange={changeData} />
  </form>
</ModalYesNo>
    </>
  )
}
