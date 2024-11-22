import { useState, useEffect } from "react";
import Formulario41 from "../Forms/Form41/Formulario41";
import Formulario7 from "../Forms/Form7/Formulario7";
import Formulario6 from "../Forms/Forms6/Formulario6";
import PdfView from "../../../../components/layoutComponents/PdfView";
import { useSelector } from "react-redux";
import Formulario9 from "../Forms/Form9/Formulario9";
import Formulario10 from "../Forms/Form10/Formulario10";
import Formulario21 from "../Forms/Formulario21";
import { getCountry } from "../../../../util/services";
import Formulario22 from "../Forms/Formulario22";
import Formulario23 from "../Forms/Formulario23";
import Formulario51 from "../Forms/Form51/Formulario51";
import { LoadingState } from "../../../../components/skeleton/LoadingState";

export default function FormatsHiring() {
  const [formData, setFormData] = useState({});
  const { interviewers } = useSelector((state) => state.currentViews);
  const { currentHiring } = useSelector((state) => state.currentViews);
  const { profile } = useSelector((state) => state.currentViews);

  useEffect(() => {
    setFormData({ ...formData, profile, currentHiring });
  }, [interviewers, profile, currentHiring]);

  // Estado para controlar qué formulario está abierto
  const [openForm, setOpenForm] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const countryData = await getCountry();
      setCountries(countryData);
    };

    fetchCountries();
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
        {/* Botón del formulario 21 */}
        <section className="w-full md:w-1/3 p-1">
          <button
            className={`border border-[#010064] bg-[rgb(1,0,100)] text-white size-10 w-full h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={() => handleButtonClick("form21")}
          >
            <span>F-PMSSA-21</span>
          </button>

          {openForm === "form21" && isLoading && <LoadingState />}
          {openForm === "form21" && (
            <PdfView
              closePdf={closePdf}
              title="F-PMSSA-21"
              onLoadComplete={() => setIsLoading(false)}
            >
              <Formulario21
                data={profile}
                hiring={currentHiring}
                countries={countries}
              />
            </PdfView>
          )}
        </section>

        {/* Botón del formulario 22 */}
        <section className="w-full md:w-1/3 p-1">
          <button
            className={`border border-[#010064] bg-[#010064] text-white size-10 w-full h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={() => handleButtonClick("form22")}
          >
            <span>F-PMSSA-22</span>
          </button>
          {openForm === "form22" && isLoading && <LoadingState />}
          {openForm === "form22" && (
            <PdfView
              closePdf={closePdf}
              title="F-PMSSA-22"
              onLoadComplete={() => setIsLoading(false)}
            >
              <Formulario22 data={profile} hiring={currentHiring} />
            </PdfView>
          )}
        </section>

        {/* Botón del formulario 23 */}
        <section className="w-full md:w-1/3 p-1">
          <button
            className={`border border-[#010064] bg-[#010064] text-white size-10 w-full h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={() => handleButtonClick("form23")}
          >
            <span>F-PMSSA-23</span>
          </button>
          {openForm === "form23" && isLoading && <LoadingState />}
          {openForm === "form23" && (
            <PdfView
              closePdf={closePdf}
              title="F-PMSSA-23"
              onLoadComplete={() => setIsLoading(false)}
            >
              <Formulario23 data={profile} hiring={currentHiring} />
            </PdfView>
          )}
        </section>

        {/* Botón del formulario 41 */}
        <section className="w-full md:w-1/3 p-1">
          <button
            className={`border border-[#010064] bg-[#010064] text-white size-10 w-full h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={() => handleButtonClick("form41")}
          >
            <span>F-PMSSA-41</span>
          </button>
          {openForm === "form41" && isLoading && <LoadingState />}
          {openForm === "form41" && (
            <PdfView
              closePdf={closePdf}
              title="F-PMSSA-41"
              onLoadComplete={() => setIsLoading(false)}
            >
              <Formulario41
                interviewData={interviewers}
                data={profile}
                hiring={currentHiring}
              />
            </PdfView>
          )}
        </section>

        {/* Botón del formulario 51 */}
        <section className="w-full md:w-1/3 p-1">
          <button
            className={`border border-[#010064] bg-[#010064] text-white size-10 w-full h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={() => handleButtonClick("form51")}
          >
            <span>F-PMSSA-51</span>
          </button>
          {openForm === "form51" && isLoading && <LoadingState />}
          {openForm === "form51" && (
            <PdfView
              closePdf={closePdf}
              title="F-PMSSA-51"
              onLoadComplete={() => setIsLoading(false)}
            >
              <Formulario51 data={profile} hiring={currentHiring} />
            </PdfView>
          )}
        </section>

        {/* Botón del formulario 09 */}
        <section className="w-full md:w-1/3 p-1">
          <button
            className={`border border-[#010064] bg-[#010064] text-white size-10 w-full h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={() => handleButtonClick("form09")}
          >
            <span>F-PMSSA-09</span>
          </button>
          {openForm === "form09" && isLoading && <LoadingState />}
          {openForm === "form09" && (
            <PdfView
              closePdf={closePdf}
              title="F-PMSSA-09"
              onLoadComplete={() => setIsLoading(false)}
            >
              <Formulario9
                interviewData={interviewers}
                data={profile}
                hiring={currentHiring}
              />
            </PdfView>
          )}
        </section>

        {/* Botón del formulario 10 */}
        <section className="w-full md:w-1/3 p-1">
          <button
            className={`border border-[#010064] bg-[#010064] text-white size-10 w-full h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={() => handleButtonClick("form10")}
          >
            <span>F-PMSSA-10</span>
          </button>
          {openForm === "form10" && isLoading && <LoadingState />}
          {openForm === "form10" && (
            <PdfView
              closePdf={closePdf}
              title="F-PMSSA-10"
              onLoadComplete={() => setIsLoading(false)}
            >
              <Formulario10
                interviewData={interviewers}
                data={profile}
                hiring={currentHiring}
              />
            </PdfView>
          )}
        </section>
      </section>
    </>
  );
}
