import {useState} from 'react'
import PdfView from '../../components/layoutComponents/PdfView'
import GapolReport from '../../reports/GapolReport'

export default function MyReport() {
    const [ispdf,setIsPdf]=useState(false)
    const [openForm, setOpenForm] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Estado de carga
    const activar=(()=>{
        setIsPdf(!ispdf)
      })
      const closePdf = () => {
        setOpenForm(null);
        setIsLoading(false); // Detiene la carga al cerrar el PDF
      };
  return (
<div>
    <button onClick={activar}>activar</button>
        { ispdf?<PdfView 
         closePdf={closePdf}
         title="F-PMSSA-22"
         onLoadComplete={() => setIsLoading(false)}>
<GapolReport/>

</PdfView>:null}
</div>
  )
}
