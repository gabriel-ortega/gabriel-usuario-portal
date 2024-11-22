import { useState, useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import {
  toolbarPlugin,
  ToolbarSlot,
  TransformToolbarSlot,
} from "@react-pdf-viewer/toolbar";
import IconWORD from "../../assets/imagenes/svg/iconWORD.svg";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export function DocumentViewer({ file, closeView, typeDocument }) {
  const transform = (slot) => {
    const { Open, ...restSlot } = slot;

    // Return the slot without the "Open" component
    return {
      ...restSlot,
      Open: () => null, // Renders nothing, effectively hiding the "Open" component
    };
  };

  // Your render function
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar, renderDefaultToolbar } = toolbarPluginInstance;
  const [pdfUrl, setPdfUrl] = useState(null);
  useEffect(() => {
    if (file) {
      if (file?.url) {
        setPdfUrl(file?.url);
      } else {
        handleFileChange(file);
      }
    }
  }, [file]);

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPdfUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {typeDocument == "pdf" ? (
        <>
          {
            <div className="fixed top-0 left-0 h-[100vh] w-screen z-[99] flex items-center justify-center bg-gray-900 bg-opacity-75">
              <div className=" rounded-lg bg-slate-200 p-4">
                <button
                  type="button"
                  className=" absolute z-30 top-10 right-3 m-2 p-2 rounded-full bg-gray-600 text-white"
                  onClick={closeView}
                >
                  <HiOutlineX className=" w-4 h-4 " />
                </button>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
                  <div className="w-screen h-screen ">
                    {pdfUrl && (
                      <>
                        <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
                        <Viewer
                          fileUrl={pdfUrl}
                          defaultScale={1}
                          plugins={[toolbarPluginInstance]}
                        />
                      </>
                    )}
                  </div>
                </Worker>
              </div>
            </div>
          }
        </>
      ) : (
        <div className="fixed top-0 left-0 h-[100vh] w-screen z-[99] flex flex-col items-center justify-center bg-gray-900 bg-opacity-75">
          <img src={IconWORD} alt="document" className="w-20 h-20" />
          <p className="text-white text-lg pt-2 pb-2 font-bold">{file.name}</p>
          <div className="flex gap-3">
            <button
              type="button"
              className="block text-center bg-blue-500 text-white py-2 px-4 rounded"
              onClick={closeView}
            >
              Cerrar
            </button>
            <a
              href={pdfUrl}
              download={file.name}
              className="block text-center bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => console.log(pdfUrl)}
            >
              Descargar
            </a>
          </div>
        </div>
      )}
    </>
  );
}
