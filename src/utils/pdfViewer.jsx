// import { pdfjs } from 'pdfjs-dist';
// import 'pdfjs-dist/web/pdf_viewer.css'
// import { useEffect, useRef, useState } from 'react';
// export const PDFViewer = ({ pdfUrl }) => {
//   const canvasRef = useRef(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pdf, setPdf] = useState(null);

//   useEffect(() => {
//     const loadPDF = async () => {
//       const loadingTask = pdfjs.getDocument(pdfUrl);
//       const loadedPdf = await loadingTask.promise;
//       setPdf(loadedPdf);
//     };

//     loadPDF();
//   }, [pdfUrl]);
//   console.log(pdfUrl);

//   useEffect(() => {
//     const renderPage = async () => {
//       if (pdf) {
//         const page = await pdf.getPage(currentPage);
//         const scale = 1.5;
//         const viewport = page.getViewport({ scale });
//         const canvas = canvasRef.current;
//         const context = canvas.getContext('2d');
//         canvas.height = viewport.height;
//         canvas.width = viewport.width;

//         const renderContext = {
//           canvasContext: context,
//           viewport: viewport,
//         };
//         page.render(renderContext);
//       }
//     };

//     renderPage();
//   }, [pdf, currentPage]);

//   return (
//     <div style={{ background: "green" }}>
//       <canvas ref={canvasRef}></canvas>
//       <div>
//         <button disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>
//           Previous Page
//         </button>
//         <button disabled={!pdf || currentPage >= pdf.numPages} onClick={() => setCurrentPage(currentPage + 1)}>
//           Next Page
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PDFViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoad = ({ numPages }) => {
    setNumPages(numPages);
  };
  console.log(pdfUrl);

  return (
    <div>
      <Document
        file="https://myknowroo.s3.amazonaws.com/assignments/ResumeTahirSultan.pdf"
        onLoadSuccess={onDocumentLoad}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};
