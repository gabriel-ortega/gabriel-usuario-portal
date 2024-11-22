import Formulario7 from "../Forms/Form7/Formulario7";
import PdfView from "../../../../components/layoutComponents/PdfView";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Formulario6 from "../Forms/Forms6/Formulario6";
import Formulario48 from "../Forms/Fromulario48";
import Formulario8 from "../Forms/Form8/Formulario8";
import { LoadingState } from "../../../../components/skeleton/LoadingState";

export default function FormatsFirstInterview() {
  const [formData, setFormData] = useState({});

  const { profile } = useSelector((state) => state.currentViews);
  const { currentInterview } = useSelector((state) => state.currentViews);
  const { interviewers } = useSelector((state) => state.currentViews);

  useEffect(() => {
    setFormData({
      ...formData,

      profile,
      currentInterview,
      interviewers,
    });
  }, [profile, currentInterview, interviewers]);

  const [openForm, setOpenForm] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const handleButtonClick = (form) => {
    setOpenForm(form);
    setIsLoading(true); // Inicia la carga al abrir el formulario
  };

  const closePdf = () => {
    setOpenForm(null);
    setIsLoading(false); // Detiene la carga al cerrar el PDF
  };

  return (
    <>
      <section className="w-full p-5 flex flex-wrap justify-between">
        {/* Botón del formulario 07 */}
        <section className="w-full md:w-1/3 p-1">
          <button
            className={`border border-[#010064] bg-[rgb(1,0,100)] text-white size-10 w-full h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={() => handleButtonClick("form07")}
          >
            <span>F-PMSSA-07</span>
          </button>

          {openForm === "form07" && isLoading && <LoadingState />}
          {openForm === "form07" && (
            <PdfView
              closePdf={closePdf}
              title="F-PMSSA-07"
              onLoadComplete={() => setIsLoading(false)}
            >
              <Formulario7
                data={profile}
                interview={currentInterview}
                interviewData={interviewers}
              />
            </PdfView>
          )}
        </section>

        {/* Botón del formulario 08 */}
        <section className="w-full md:w-1/3 p-1">
          <button
            className={`border border-[#010064] bg-[#010064] text-white size-10 w-full h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={() => handleButtonClick("form08")}
          >
            <span>F-PMSSA-08</span>
          </button>
          {openForm === "form08" && isLoading && <LoadingState />}
          {openForm === "form08" && (
            <PdfView
              closePdf={closePdf}
              title="F-PMSSA-08"
              onLoadComplete={() => setIsLoading(false)}
            >
              <Formulario8
                data={profile}
                interview={currentInterview}
                interviewData={interviewers}
              />
            </PdfView>
          )}
        </section>

        {/* Botón del formulario 06 */}
        <section className="w-full md:w-1/3 p-1">
          <button
            className={`border border-[#010064] bg-[#010064] text-white size-10 w-full h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={() => handleButtonClick("form06")}
          >
            <span>F-PMSSA-06</span>
          </button>
          {openForm === "form06" && isLoading && <LoadingState />}
          {openForm === "form06" && (
            <PdfView
              closePdf={closePdf}
              title="F-PMSSA-06"
              onLoadComplete={() => setIsLoading(false)}
            >
              <Formulario6
                data={profile}
                interview={currentInterview}
                interviewData={interviewers}
              />
            </PdfView>
          )}
        </section>

        {/* Botón del formulario 48 */}
        <section className="w-full md:w-1/3 p-1">
          <button
            className={`border border-[#0e0e18] bg-[#010064] text-white size-10 w-full h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={() => handleButtonClick("form48")}
          >
            <span>F-PMSSA-48</span>
          </button>
          {openForm === "form48" && isLoading && <LoadingState />}
          {openForm === "form48" && (
            <PdfView
              closePdf={closePdf}
              title="F-PMSSA-48"
              onLoadComplete={() => setIsLoading(false)}
            >
              <Formulario48 data={profile} interview={currentInterview} />
            </PdfView>
          )}
        </section>
      </section>
    </>
  );
}
