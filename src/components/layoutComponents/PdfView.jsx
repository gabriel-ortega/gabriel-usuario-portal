import { PDFViewer, Document } from "@react-pdf/renderer";
export default function PdfView({ children, closePdf, title }) {
  return (
    <div>
      <PDFViewer
        style={{
          width: "90%",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Document title={title}>{children}</Document>
      </PDFViewer>
      <button
        className="fixed top-0 right-0 text-4xl text-center p-4 px-5 text-white"
        onClick={closePdf}
      >
        X
      </button>
      <div className="fixed bg-black h-full w-full top-0 left-0 opacity-60 -z-50 "></div>
    </div>
  );
}
