// PdfGenerator.js
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function PdfGenerator() {
  const printRef = useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('download.pdf');
  };

  return (
    <div>
      <div ref={printRef} style={{ padding: 20, backgroundColor: '#fff', color: '#000' }}>
        <h2>React PDF Generator</h2>
        <p>This is the content that will be exported to a PDF file.</p>
      </div>

      <button onClick={handleDownloadPdf} className="btn btn-primary mt-3">
        Download PDF
      </button>
    </div>
  );
}

export default PdfGenerator;
