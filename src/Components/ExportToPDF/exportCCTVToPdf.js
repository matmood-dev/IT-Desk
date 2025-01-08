import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import logo from '../../assets/logo.png';

const exportCCTVToPdf = (cameras) => {
  const doc = new jsPDF();
  const img = new Image();
  img.src = logo;

  // Centering elements with resized logo
  doc.addImage(img, 'PNG', doc.internal.pageSize.getWidth() / 2 - 25, 20, 50, 50); // Resize logo to 50x50 pixels
  doc.setFontSize(18);
  doc.text('YAS Holding IT Department', doc.internal.pageSize.getWidth() / 2, 80, { align: 'center' });
  doc.setFontSize(22);
  doc.text('CCTV Configuration', doc.internal.pageSize.getWidth() / 2, 100, { align: 'center' });

  const tableColumn = ["Camera Name", "IP Address", "SN", "Port", "Username", "Password"];
  const tableRows = [];

  cameras.forEach(camera => {
    const cameraData = [
      camera.name,
      camera.ipAddress,
      camera.SN,
      camera.port,
      camera.username,
      camera.password
    ];
    tableRows.push(cameraData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 110,
    theme: 'grid',
    headStyles: {
      fillColor: '#008aad', // Change header color to #008aad
      textColor: '#ffffff', // Set text color to white for better contrast
      halign: 'center' // Center align table header
    },
    styles: { halign: 'center' }, // Center align table data
  });

  doc.save('CCTVConfiguration.pdf');
};

export default exportCCTVToPdf;
