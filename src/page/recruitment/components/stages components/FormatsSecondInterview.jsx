import PdfView from "../../../../components/layoutComponents/PdfView";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPositions } from "../../../../util/services";
import Formulario12 from "../Forms/Form12/Formulario12";
import Formulario13 from "../Forms/Form13/Formulario13";
import Formulario14 from "../Forms/Formulario14";
import Formulario11 from "../Forms/Form11/Formulario11";
import { LoadingState } from "../../../../components/skeleton/LoadingState";

export default function FormatsSecondInterview() {
  const [formData, setFormData] = useState({});
  const { profile } = useSelector((state) => state.currentViews);
  const { currentInterview } = useSelector((state) => state.currentViews);
  const { interviewers } = useSelector((state) => state.currentViews);

  useEffect(() => {
    setFormData({ ...formData, profile, currentInterview, interviewers });
  }, [profile, currentInterview, interviewers]);

  const [openForm, setOpenForm] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [position, setPosition] = useState([]);

  useEffect(() => {
    const fetchPosition = async () => {
      const positionData = await getPositions();
      setPosition(positionData);
    };

    fetchPosition();
  }, []);

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
        {/* Botón del formulario 12 */}
        <section className="w-full md:w-1/3 p-1">
          <button
            className={`border border-[#010064] bg-[rgb(1,0,100)] text-white size-10 w-full h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={() => handleButtonClick("form12")}
          >
            <span>F-PMSSA-12</span>
          </button>

          {openForm === "form12" && isLoading && <LoadingState />}
          {openForm === "form12" && (
            <PdfView
              closePdf={closePdf}
              title="F-PMSSA-12"
              onLoadComplete={() => setIsLoading(false)}
            >
              <Formulario12
                data={profile}
                interview={currentInterview}
                interviewData={interviewers}
              />
            </PdfView>
          )}
        </section>

        {/* Botón del formulario 13 */}
        <section className="w-full md:w-1/3 p-1">
          <button
            className={`border border-[#010064] bg-[#010064] text-white size-10 w-full h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={() => handleButtonClick("form13")}
          >
            <span>F-PMSSA-13</span>
          </button>
          {openForm === "form13" && isLoading && <LoadingState />}
          {openForm === "form13" && (
            <PdfView
              closePdf={closePdf}
              title="F-PMSSA-13"
              onLoadComplete={() => setIsLoading(false)}
            >
              <Formulario13
                data={profile}
                interview={currentInterview}
                interviewData={interviewers}
                pos={position}
              />
            </PdfView>
          )}
        </section>

        {/* Botón del formulario 14 */}
        <section className="w-full md:w-1/3 p-1">
          <button
            className={`border border-[#010064] bg-[#010064] text-white size-10 w-full h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={() => handleButtonClick("form14")}
          >
            <span>F-PMSSA-14</span>
          </button>
          {openForm === "form14" && isLoading && <LoadingState />}
          {openForm === "form14" && (
            <PdfView
              closePdf={closePdf}
              title="F-PMSSA-14"
              onLoadComplete={() => setIsLoading(false)}
            >
              <Formulario14 data={profile} interview={currentInterview} />
            </PdfView>
          )}
        </section>

        {/* Botón del formulario 11 */}
        <section className="w-full md:w-1/3 p-1">
          <button
            className={`border border-[#010064] bg-[#010064] text-white size-10 w-full h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={() => handleButtonClick("form11")}
          >
            <span>F-PMSSA-11</span>
          </button>
          {openForm === "form11" && isLoading && <LoadingState />}
          {openForm === "form11" && (
            <PdfView
              closePdf={closePdf}
              title="F-PMSSA-11"
              onLoadComplete={() => setIsLoading(false)}
            >
              <Formulario11
                data={profile}
                interview={currentInterview}
                pos={position}
                interviewData={interviewers}
              />
            </PdfView>
          )}
        </section>
      </section>
    </>
  );
}
