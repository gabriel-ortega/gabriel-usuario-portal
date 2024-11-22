import PdfView from "../../../../components/layoutComponents/PdfView";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Formulario27 from "../Forms/Form27/Formulario27";
import Formulario20 from "../Forms/Form20/Formulario20";
import { getVessels } from "../../../../util/services";
import { LoadingState } from "../../../../components/skeleton/LoadingState";

export default function FormatsEmbark() {
  const [formData, setFormData] = useState({});
  const { currentEmbark, profile, currentHiring, interviewers } = useSelector(
    (state) => state.currentViews
  );

  useEffect(() => {
    setFormData({ ...formData, profile, currentEmbark, currentHiring });
  }, [interviewers, profile, currentEmbark, currentHiring]);

  const [openForm, setOpenForm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [vessel, setVessel] = useState([]);

  const handleButtonClick = (form) => {
    setOpenForm(form);
    setIsLoading(true); // Inicia la carga al abrir el formulario
  };

  const closePdf = () => {
    setOpenForm(null);
    setIsLoading(false); // Detiene la carga al cerrar el PDF
  };

  useEffect(() => {
    const fetchVessel = async () => {
      const vesselData = await getVessels();
      setVessel(vesselData);
    };

    fetchVessel();
  }, []);

  return (
    <>
      <section className="w-full p-2 flex flex-wrap justify-between">
        {/* Botón del formulario 20 */}
        <section className="w-full md:w-1/3 p-1">
          <button
            className={`border border-[#010064] bg-[#010064] text-white size-10 w-full h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={() => handleButtonClick("form20")}
          >
            <span>F-PMSSA-20</span>
          </button>
          {openForm === "form20" && isLoading && <LoadingState />}
          {openForm === "form20" && (
            <PdfView
              closePdf={closePdf}
              title="F-PMSSA-20"
              onLoadComplete={() => setIsLoading(false)}
            >
              <Formulario20
                data={profile}
                embark={currentEmbark}
                hiring={currentHiring}
                vessel={vessel}
                interviewData={interviewers}
              />
            </PdfView>
          )}
        </section>
        {/* Botón del formulario 27 */}
        <section className="w-full md:w-1/3 p-1">
          <button
            className={`border border-[#010064] bg-[rgb(1,0,100)] text-white size-10 w-full h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={() => handleButtonClick("form27")}
          >
            <span>F-PMSSA-27</span>
          </button>

          {openForm === "form27" && isLoading && <LoadingState />}
          {openForm === "form27" && (
            <PdfView
              closePdf={closePdf}
              title="F-PMSSA-27"
              onLoadComplete={() => setIsLoading(false)}
            >
              <Formulario27
                data={profile}
                embark={currentEmbark}
                hiring={currentHiring}
                interviewData={interviewers}
              />
            </PdfView>
          )}
        </section>
      </section>
    </>
  );
}
